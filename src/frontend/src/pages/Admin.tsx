import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import {
  CheckCircle,
  Clock,
  Edit2,
  ImagePlus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { OrderStatus, ProductCategory, createActor } from "../backend";
import type { Order, Product, ProductInput, Reseller } from "../backend.d.ts";
import {
  useAddProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from "../hooks/useProducts";
import {
  useAllOrders,
  useAllResellers,
  useApproveReseller,
} from "../hooks/useReseller";

// ─── Types ────────────────────────────────────────────────────────────────────

type AdminTab = "products" | "resellers" | "orders";

interface ProductFormState {
  name: string;
  description: string;
  price: string;
  commission: string;
  imageUrl: string;
  category: ProductCategory;
  isFeatured: boolean;
}

const EMPTY_FORM: ProductFormState = {
  name: "",
  description: "",
  price: "",
  commission: "",
  imageUrl: "",
  category: ProductCategory.gadgets,
  isFeatured: false,
};

const categoryOptions = [
  { value: ProductCategory.fan, label: "Fan / ফ্যান" },
  { value: ProductCategory.gadgets, label: "Gadgets / গ্যাজেট" },
  { value: ProductCategory.kitchen, label: "Kitchen / রান্নাঘর" },
  { value: ProductCategory.health, label: "Health & Beauty" },
];

const orderStatusOptions = [
  { value: OrderStatus.pending, label: "Pending", color: "text-warning" },
  { value: OrderStatus.completed, label: "Completed", color: "text-primary" },
  { value: OrderStatus.paid, label: "Paid", color: "text-success" },
];

// ─── Image Upload Helper ──────────────────────────────────────────────────────

function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFile = async (file: File): Promise<string | null> => {
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setUploading(true);
    setProgress(0);
    try {
      // Simulate progress for local preview — store as data URL for persistence
      const reader = new FileReader();
      return await new Promise<string | null>((resolve) => {
        reader.onprogress = (e) => {
          if (e.lengthComputable)
            setProgress(Math.round((e.loaded / e.total) * 100));
        };
        reader.onload = () => {
          setProgress(100);
          resolve(reader.result as string);
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
      });
    } catch {
      toast.error("Image upload failed");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setPreviewUrl(null);
    setProgress(0);
  };

  return { uploading, progress, previewUrl, handleFile, reset };
}

// ─── Product Form Modal ───────────────────────────────────────────────────────

function ProductFormDialog({
  open,
  onClose,
  editProduct,
}: {
  open: boolean;
  onClose: () => void;
  editProduct?: Product | null;
}) {
  const isEdit = !!editProduct;
  const [form, setForm] = useState<ProductFormState>(
    editProduct
      ? {
          name: editProduct.name,
          description: editProduct.description,
          price: editProduct.price.toString(),
          commission: editProduct.commission.toString(),
          imageUrl: editProduct.imageUrl,
          category: editProduct.category,
          isFeatured: editProduct.isFeatured,
        }
      : EMPTY_FORM,
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { uploading, progress, previewUrl, handleFile } = useImageUpload();
  const { mutate: addProduct, isPending: addPending } = useAddProduct();
  const { mutate: updateProduct, isPending: updatePending } =
    useUpdateProduct();
  const isPending = addPending || updatePending;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await handleFile(file);
    if (url) setForm((f) => ({ ...f, imageUrl: url }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.commission) return;
    const priceNum = Number(form.price);
    const commissionNum = Number(form.commission);
    if (priceNum <= 0 || commissionNum <= 0) {
      toast.error("Price and commission must be positive numbers");
      return;
    }
    const input: ProductInput = {
      name: form.name.trim(),
      description: form.description.trim(),
      price: BigInt(form.price),
      commission: BigInt(form.commission),
      imageUrl: form.imageUrl.trim(),
      category: form.category,
      isFeatured: form.isFeatured,
    };

    if (isEdit && editProduct) {
      updateProduct(
        { id: editProduct.id, input },
        {
          onSuccess: () => {
            toast.success("Product updated successfully!");
            onClose();
          },
          onError: () => toast.error("Failed to update product"),
        },
      );
    } else {
      addProduct(input, {
        onSuccess: () => {
          toast.success("Product added successfully!");
          onClose();
          setForm(EMPTY_FORM);
        },
        onError: () => toast.error("Failed to add product"),
      });
    }
  };

  const currentImage = previewUrl || (form.imageUrl ? form.imageUrl : null);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-md max-h-[92vh] overflow-y-auto"
        data-ocid="admin.product_dialog"
      >
        <DialogHeader>
          <DialogTitle className="font-display font-bold text-lg">
            {isEdit ? "Edit Product" : "Add New Product"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-1">
          {/* Image Upload */}
          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              Product Image
            </Label>
            <button
              type="button"
              className="relative w-full h-36 rounded-xl border-2 border-dashed border-border bg-muted/30 flex items-center justify-center cursor-pointer hover:border-primary/50 transition-smooth overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
              data-ocid="admin.product_image_dropzone"
            >
              {currentImage ? (
                <img
                  src={currentImage}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-muted-foreground">
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-xs font-medium">
                    Click to upload image
                  </span>
                </div>
              )}
              {uploading && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center gap-2">
                  <div className="w-24 h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-smooth"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Uploading {progress}%
                  </span>
                </div>
              )}
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              data-ocid="admin.product_image_input"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Or paste URL below:
            </p>
            <Input
              value={form.imageUrl}
              onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
              placeholder="https://..."
              className="mt-1"
              data-ocid="admin.product_image_url_input"
            />
          </div>

          {/* Name */}
          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              Product Name *
            </Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. M4 Smart Fitness Band"
              required
              data-ocid="admin.product_name_input"
            />
          </div>

          {/* Description */}
          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              Description
            </Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Product description..."
              rows={3}
              className="resize-none"
              data-ocid="admin.product_description_input"
            />
          </div>

          {/* Price + Commission */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">
                Price (৳) *
              </Label>
              <Input
                type="number"
                min="1"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                placeholder="850"
                required
                data-ocid="admin.product_price_input"
              />
            </div>
            <div>
              <Label className="text-xs font-semibold mb-1.5 block">
                Commission (৳) *
              </Label>
              <Input
                type="number"
                min="1"
                value={form.commission}
                onChange={(e) =>
                  setForm({ ...form, commission: e.target.value })
                }
                placeholder="330"
                required
                data-ocid="admin.product_commission_input"
              />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label className="text-xs font-semibold mb-1.5 block">
              Category
            </Label>
            <select
              value={form.category}
              onChange={(e) =>
                setForm({
                  ...form,
                  category: e.target.value as ProductCategory,
                })
              }
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              data-ocid="admin.product_category_select"
            >
              {categoryOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between py-1">
            <div>
              <p className="text-sm font-medium">Featured Product ⭐</p>
              <p className="text-xs text-muted-foreground">
                Show on homepage hero section
              </p>
            </div>
            <Switch
              checked={form.isFeatured}
              onCheckedChange={(v) => setForm({ ...form, isFeatured: v })}
              data-ocid="admin.product_featured_switch"
            />
          </div>

          <DialogFooter className="gap-2 mt-1">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              data-ocid="admin.product_cancel_button"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending || uploading}
              className="bg-primary text-primary-foreground hover:opacity-90 font-bold"
              data-ocid="admin.product_submit_button"
            >
              {isPending
                ? isEdit
                  ? "Saving..."
                  : "Adding..."
                : isEdit
                  ? "Save Changes"
                  : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// ─── Delete Confirm Dialog ────────────────────────────────────────────────────

function DeleteConfirmDialog({
  open,
  productName,
  onConfirm,
  onCancel,
}: {
  open: boolean;
  productName: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <AlertDialog open={open} onOpenChange={onCancel}>
      <AlertDialogContent data-ocid="admin.delete_product_dialog">
        <AlertDialogHeader>
          <AlertDialogTitle className="font-display font-bold">
            Delete Product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete{" "}
            <span className="font-semibold text-foreground">{productName}</span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={onCancel}
            data-ocid="admin.delete_product_cancel_button"
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:opacity-90"
            data-ocid="admin.delete_product_confirm_button"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ─── Status Badge ─────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  if (status === OrderStatus.paid) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-success/15 text-success border border-success/20">
        <CheckCircle className="w-3 h-3" /> Paid
      </span>
    );
  }
  if (status === OrderStatus.completed) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-primary/10 text-primary border border-primary/20">
        <CheckCircle className="w-3 h-3" /> Completed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-warning/15 text-warning border border-warning/20">
      <Clock className="w-3 h-3" /> Pending
    </span>
  );
}

// ─── Products Tab ─────────────────────────────────────────────────────────────

function ProductsTab({
  onAdd,
  onEdit,
}: {
  onAdd: () => void;
  onEdit: (p: Product) => void;
}) {
  const { data: products, isLoading } = useProducts();
  const { mutate: deleteProduct } = useDeleteProduct();
  const [confirmDelete, setConfirmDelete] = useState<Product | null>(null);

  const handleDelete = (product: Product) => setConfirmDelete(product);

  const confirmDeleteProduct = () => {
    if (!confirmDelete) return;
    deleteProduct(confirmDelete.id, {
      onSuccess: () => {
        toast.success("Product deleted");
        setConfirmDelete(null);
      },
      onError: () => {
        toast.error("Failed to delete product");
        setConfirmDelete(null);
      },
    });
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-2"
        data-ocid="admin.products_loading_state"
      >
        {["a", "b", "c"].map((k) => (
          <Skeleton key={k} className="h-[72px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div
        className="py-16 flex flex-col items-center gap-3 text-center"
        data-ocid="admin.products_empty_state"
      >
        <Package className="w-14 h-14 text-muted-foreground/30" />
        <p className="font-display font-bold text-lg">No products yet</p>
        <p className="text-sm text-muted-foreground">
          Add your first product to start selling
        </p>
        <Button
          onClick={onAdd}
          className="bg-primary text-primary-foreground hover:opacity-90 font-bold mt-1"
          data-ocid="admin.add_first_product_button"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          Add First Product
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Product
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Category
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Price
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Commission
                </th>
                <th className="text-center px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Featured
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, idx) => (
                <motion.tr
                  key={product.id.toString()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.product_item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-muted/40 shrink-0">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-base">
                            📦
                          </div>
                        )}
                      </div>
                      <span className="font-medium truncate max-w-[160px]">
                        {product.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className="text-xs capitalize">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right font-semibold">
                    ৳{product.price.toString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="badge-commission">
                      ৳{product.commission.toString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {product.isFeatured ? (
                      <span className="text-warning text-base" title="Featured">
                        ⭐
                      </span>
                    ) : (
                      <span className="text-muted-foreground text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 hover:bg-primary/10 hover:text-primary"
                        onClick={() => onEdit(product)}
                        aria-label="Edit"
                        data-ocid={`admin.product_edit_button.${idx + 1}`}
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 w-7 p-0 hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleDelete(product)}
                        aria-label="Delete"
                        data-ocid={`admin.product_delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile card list */}
      <div className="md:hidden flex flex-col gap-2">
        {products.map((product, idx) => (
          <motion.div
            key={product.id.toString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
            data-ocid={`admin.product_item.${idx + 1}`}
          >
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted/40 shrink-0">
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl">
                  📦
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <p className="font-semibold text-sm truncate">{product.name}</p>
                {product.isFeatured && (
                  <span className="text-warning text-xs">⭐</span>
                )}
              </div>
              <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                <span className="text-xs text-muted-foreground">
                  ৳{product.price.toString()}
                </span>
                <span className="badge-commission">
                  ৳{product.commission.toString()} profit
                </span>
                <Badge variant="outline" className="text-[10px] capitalize h-4">
                  {product.category}
                </Badge>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              <button
                type="button"
                onClick={() => onEdit(product)}
                className="p-1.5 rounded-lg hover:bg-primary/10 hover:text-primary text-muted-foreground transition-smooth"
                aria-label="Edit"
                data-ocid={`admin.product_edit_button.${idx + 1}`}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => handleDelete(product)}
                className="p-1.5 rounded-lg hover:bg-destructive/10 hover:text-destructive text-muted-foreground transition-smooth"
                aria-label="Delete"
                data-ocid={`admin.product_delete_button.${idx + 1}`}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <DeleteConfirmDialog
        open={!!confirmDelete}
        productName={confirmDelete?.name ?? ""}
        onConfirm={confirmDeleteProduct}
        onCancel={() => setConfirmDelete(null)}
      />
    </>
  );
}

// ─── Resellers Tab ────────────────────────────────────────────────────────────

function ResellersTab() {
  const { data: resellers, isLoading } = useAllResellers();
  const { mutate: updateStatus } = useApproveReseller();

  const handleToggleApproval = (reseller: Reseller) => {
    updateStatus(
      { principal: reseller.principal, approved: !reseller.isApproved },
      {
        onSuccess: () =>
          toast.success(
            reseller.isApproved ? "Reseller unapproved" : "Reseller approved!",
          ),
        onError: () => toast.error("Failed to update reseller status"),
      },
    );
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-2"
        data-ocid="admin.resellers_loading_state"
      >
        {["a", "b", "c"].map((k) => (
          <Skeleton key={k} className="h-[72px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (!resellers || resellers.length === 0) {
    return (
      <div
        className="py-16 flex flex-col items-center gap-3 text-center"
        data-ocid="admin.resellers_empty_state"
      >
        <Users className="w-14 h-14 text-muted-foreground/30" />
        <p className="font-display font-bold text-lg">No resellers yet</p>
        <p className="text-sm text-muted-foreground">
          Reseller applications will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Reseller
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Affiliate Code
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Registered
                </th>
                <th className="text-center px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {resellers.map((reseller, idx) => (
                <motion.tr
                  key={reseller.principal.toString()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.reseller_item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shrink-0">
                        {reseller.name.charAt(0).toUpperCase()}
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium truncate">{reseller.name}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {reseller.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {reseller.affiliateCode}
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(
                      Number(reseller.registeredAt) / 1_000_000,
                    ).toLocaleDateString("en-BD")}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {reseller.isApproved ? (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-success/15 text-success border border-success/20">
                        <CheckCircle className="w-3 h-3" /> Approved
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-warning/15 text-warning border border-warning/20">
                        <Clock className="w-3 h-3" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleToggleApproval(reseller)}
                      className={`h-7 text-xs font-bold ${
                        reseller.isApproved
                          ? "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                          : "hover:bg-success/10 hover:text-success hover:border-success/30"
                      }`}
                      data-ocid={`admin.reseller_toggle_button.${idx + 1}`}
                    >
                      {reseller.isApproved ? (
                        <>
                          <UserX className="w-3 h-3 mr-1" /> Unapprove
                        </>
                      ) : (
                        <>
                          <UserCheck className="w-3 h-3 mr-1" /> Approve
                        </>
                      )}
                    </Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2">
        {resellers.map((reseller, idx) => (
          <motion.div
            key={reseller.principal.toString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-card border border-border rounded-xl p-3"
            data-ocid={`admin.reseller_item.${idx + 1}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center font-bold text-primary shrink-0">
                {reseller.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm truncate">
                  {reseller.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {reseller.email}
                </p>
              </div>
              {reseller.isApproved ? (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-success/15 text-success border border-success/20 shrink-0">
                  <CheckCircle className="w-3 h-3" /> Approved
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-bold bg-warning/15 text-warning border border-warning/20 shrink-0">
                  <Clock className="w-3 h-3" /> Pending
                </span>
              )}
            </div>
            <div className="flex items-center justify-between mt-1">
              <span className="font-mono text-xs text-muted-foreground">
                Code: {reseller.affiliateCode}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleToggleApproval(reseller)}
                className={`h-7 text-xs font-bold ${
                  reseller.isApproved
                    ? "hover:bg-destructive/10 hover:text-destructive hover:border-destructive/30"
                    : "hover:bg-success/10 hover:text-success hover:border-success/30"
                }`}
                data-ocid={`admin.reseller_toggle_button.${idx + 1}`}
              >
                {reseller.isApproved ? (
                  <>
                    <UserX className="w-3 h-3 mr-1" /> Unapprove
                  </>
                ) : (
                  <>
                    <UserCheck className="w-3 h-3 mr-1" /> Approve
                  </>
                )}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────

function OrdersTab() {
  const { data: orders, isLoading } = useAllOrders();
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();

  const handleStatusChange = async (order: Order, status: OrderStatus) => {
    if (!actor) return;
    try {
      await actor.updateOrderStatus(order.id, status);
      await queryClient.invalidateQueries({ queryKey: ["allOrders"] });
      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update order status");
    }
  };

  if (isLoading) {
    return (
      <div
        className="flex flex-col gap-2"
        data-ocid="admin.orders_loading_state"
      >
        {["a", "b", "c"].map((k) => (
          <Skeleton key={k} className="h-[72px] rounded-xl" />
        ))}
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div
        className="py-16 flex flex-col items-center gap-3 text-center"
        data-ocid="admin.orders_empty_state"
      >
        <ShoppingCart className="w-14 h-14 text-muted-foreground/30" />
        <p className="font-display font-bold text-lg">No orders yet</p>
        <p className="text-sm text-muted-foreground">
          Customer orders will appear here
        </p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop table */}
      <div className="hidden md:block rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/40 border-b border-border">
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Order
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Customer
                </th>
                <th className="text-left px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Reseller
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Commission
                </th>
                <th className="text-center px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Status
                </th>
                <th className="text-right px-4 py-2.5 font-semibold text-xs text-muted-foreground uppercase tracking-wide">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, idx) => (
                <motion.tr
                  key={order.id.toString()}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.03 }}
                  className="border-b border-border last:border-0 hover:bg-muted/20 transition-smooth"
                  data-ocid={`admin.order_item.${idx + 1}`}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      #{order.id.toString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-sm">{order.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {order.customerPhone}
                    </p>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-muted-foreground truncate max-w-[100px] block">
                      {order.resellerPrincipal.toString().slice(0, 14)}…
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="badge-commission">
                      ৳{order.commissionAmount.toString()}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <StatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order,
                            e.target.value as OrderStatus,
                          )
                        }
                        className="h-7 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                        data-ocid={`admin.order_status_select.${idx + 1}`}
                      >
                        {orderStatusOptions.map((opt) => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {order.status === OrderStatus.pending && (
                        <Button
                          size="sm"
                          onClick={() =>
                            handleStatusChange(order, OrderStatus.paid)
                          }
                          className="h-7 text-xs bg-success text-success-foreground hover:opacity-90 font-bold"
                          data-ocid={`admin.order_mark_paid_button.${idx + 1}`}
                        >
                          Mark Paid
                        </Button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden flex flex-col gap-2">
        {orders.map((order, idx) => (
          <motion.div
            key={order.id.toString()}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.04 }}
            className="bg-card border border-border rounded-xl p-3"
            data-ocid={`admin.order_item.${idx + 1}`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs text-muted-foreground">
                    #{order.id.toString()}
                  </span>
                  <StatusBadge status={order.status} />
                </div>
                <p className="font-semibold text-sm mt-1">
                  {order.customerName}
                </p>
                <p className="text-xs text-muted-foreground">
                  {order.customerPhone}
                </p>
              </div>
              <span className="badge-commission shrink-0">
                ৳{order.commissionAmount.toString()}
              </span>
            </div>
            <div className="flex items-center gap-2 pt-2 border-t border-border">
              <select
                value={order.status}
                onChange={(e) =>
                  handleStatusChange(order, e.target.value as OrderStatus)
                }
                className="flex-1 h-8 rounded-md border border-input bg-background px-2 text-xs focus:outline-none focus:ring-1 focus:ring-ring"
                data-ocid={`admin.order_status_select.${idx + 1}`}
              >
                {orderStatusOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              {order.status === OrderStatus.pending && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(order, OrderStatus.paid)}
                  className="h-8 text-xs bg-success text-success-foreground hover:opacity-90 font-bold"
                  data-ocid={`admin.order_mark_paid_button.${idx + 1}`}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Mark Paid
                </Button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────

export default function Admin() {
  const [activeTab, setActiveTab] = useState<AdminTab>("products");
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const { data: products } = useProducts();
  const { data: resellers } = useAllResellers();
  const { data: orders } = useAllOrders();

  const openAdd = () => {
    setEditingProduct(null);
    setProductDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingProduct(p);
    setProductDialogOpen(true);
  };

  const closeDialog = () => {
    setProductDialogOpen(false);
    setEditingProduct(null);
  };

  const tabs: {
    id: AdminTab;
    label: string;
    labelBn: string;
    icon: typeof Package;
    count?: number;
  }[] = [
    {
      id: "products",
      label: "Products",
      labelBn: "পণ্য",
      icon: Package,
      count: products?.length,
    },
    {
      id: "resellers",
      label: "Resellers",
      labelBn: "রিসেলার",
      icon: Users,
      count: resellers?.length,
    },
    {
      id: "orders",
      label: "Orders",
      labelBn: "অর্ডার",
      icon: ShoppingCart,
      count: orders?.length,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display font-black text-2xl md:text-3xl">
            Admin Panel
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            পণ্য, রিসেলার ও অর্ডার পরিচালনা করুন
          </p>
        </div>
        {activeTab === "products" && (
          <Button
            onClick={openAdd}
            className="bg-primary text-primary-foreground hover:opacity-90 font-bold shadow-sm"
            data-ocid="admin.add_product_button"
          >
            <Plus className="w-4 h-4 mr-1.5" />
            <span className="hidden sm:inline">Add Product</span>
            <span className="sm:hidden">Add</span>
          </Button>
        )}
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        {[
          {
            label: "Products",
            count: products?.length ?? 0,
            icon: Package,
            color: "text-primary bg-primary/10",
          },
          {
            label: "Resellers",
            count: resellers?.length ?? 0,
            icon: Users,
            color: "text-secondary bg-secondary/10",
          },
          {
            label: "Orders",
            count: orders?.length ?? 0,
            icon: ShoppingCart,
            color: "text-success bg-success/10",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-3 flex items-center gap-3"
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center ${stat.color} shrink-0`}
            >
              <stat.icon className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <p className="font-display font-black text-xl leading-none">
                {stat.count}
              </p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Tab navigation */}
      <div
        className="flex gap-1 bg-muted/40 rounded-xl p-1 mb-5"
        role="tablist"
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 px-2 rounded-lg text-xs font-semibold transition-smooth ${
              activeTab === tab.id
                ? "bg-card shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
            data-ocid={`admin.${tab.id}_tab`}
          >
            <tab.icon className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">{tab.label}</span>
            <span className="sm:hidden">{tab.labelBn}</span>
            {tab.count !== undefined && (
              <Badge
                variant="outline"
                className="text-[10px] px-1 py-0 h-4 min-w-[18px]"
              >
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.18 }}
      >
        {activeTab === "products" && (
          <ProductsTab onAdd={openAdd} onEdit={openEdit} />
        )}
        {activeTab === "resellers" && <ResellersTab />}
        {activeTab === "orders" && <OrdersTab />}
      </motion.div>

      {/* Product Form Modal */}
      <ProductFormDialog
        open={productDialogOpen}
        onClose={closeDialog}
        editProduct={editingProduct}
      />
    </div>
  );
}
