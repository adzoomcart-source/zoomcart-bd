import Map "mo:core/Map";
import List "mo:core/List";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Types "../types/products-resellers-orders";
import Common "../types/common";
import Lib "../lib/products-resellers-orders";

mixin (
  accessControlState : AccessControl.AccessControlState,
  products : Map.Map<Common.ProductId, Types.Product>,
  resellers : Map.Map<Principal, Types.Reseller>,
  affiliateCodes : Map.Map<Text, Principal>,
  orders : List.List<Types.Order>,
  nextProductId : { var value : Nat },
  nextOrderId : { var value : Nat },
) {

  // ── Seed flag ──────────────────────────────────────────────────────────────
  var seeded : Bool = false;

  func seedSampleProducts() {
    if (seeded) return;
    seeded := true;
    let samples : [(Text, Common.ProductCategory, Nat, Nat, Text)] = [
      ("Turbo Fan", #fan, 1500, 120, "Beat the summer heat with our high-performance Turbo Fan. Powerful airflow, energy-efficient, and ultra-quiet operation."),
      ("Kitchen Blender", #kitchen, 1200, 100, "Professional-grade kitchen blender for smoothies, soups, and sauces. Durable stainless steel blades."),
      ("Face Cream Set", #health, 900, 90, "Premium face cream set with natural ingredients. Brightens skin, reduces wrinkles, and hydrates deeply."),
      ("Smart Earbuds", #gadgets, 1800, 150, "True wireless smart earbuds with noise cancellation, 24-hour battery life, and crystal-clear sound."),
    ];
    for ((name, category, price, commission, description) in samples.values()) {
      let input : Types.ProductInput = {
        name;
        category;
        price;
        commission;
        description;
        imageUrl = "";
        isFeatured = true;
      };
      ignore Lib.addProduct(products, nextProductId, input);
    };
  };

  // ── Products (public read) ─────────────────────────────────────────────────

  public query func listProducts() : async [Types.Product] {
    Lib.listProducts(products);
  };

  public query func listProductsByCategory(category : Common.ProductCategory) : async [Types.Product] {
    Lib.listProductsByCategory(products, category);
  };

  public query func searchProducts(searchTerm : Text) : async [Types.Product] {
    Lib.searchProducts(products, searchTerm);
  };

  public query func getProduct(id : Common.ProductId) : async ?Types.Product {
    Lib.getProduct(products, id);
  };

  // ── Products (admin write) ─────────────────────────────────────────────────

  public shared ({ caller }) func addProduct(input : Types.ProductInput) : async Types.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can add products");
    };
    Lib.addProduct(products, nextProductId, input);
  };

  public shared ({ caller }) func updateProduct(id : Common.ProductId, input : Types.ProductInput) : async Types.Product {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update products");
    };
    Lib.updateProduct(products, id, input);
  };

  public shared ({ caller }) func deleteProduct(id : Common.ProductId) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can delete products");
    };
    Lib.deleteProduct(products, id);
  };

  // ── Resellers ──────────────────────────────────────────────────────────────

  public shared ({ caller }) func registerReseller(input : Types.ResellerInput) : async Types.Reseller {
    if (AccessControl.getUserRole(accessControlState, caller) == #guest) {
      Runtime.trap("Unauthorized: Must be logged in to register as reseller");
    };
    Lib.registerReseller(resellers, affiliateCodes, caller, input);
  };

  public query ({ caller }) func getMyResellerProfile() : async ?Types.ResellerProfile {
    Lib.getResellerProfile(resellers, orders, caller);
  };

  public query ({ caller }) func getResellerProfile(principal : Principal) : async ?Types.ResellerProfile {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view other reseller profiles");
    };
    Lib.getResellerProfile(resellers, orders, principal);
  };

  public shared ({ caller }) func updateResellerStatus(principal : Principal, approved : Bool) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update reseller status");
    };
    if (approved) {
      Lib.approveReseller(resellers, principal);
    } else {
      Lib.unapproveReseller(resellers, principal);
    };
  };

  public query ({ caller }) func listResellers() : async [Types.Reseller] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list resellers");
    };
    Lib.listResellers(resellers);
  };

  // ── Orders ─────────────────────────────────────────────────────────────────

  public shared func placeOrder(input : Types.OrderInput) : async Types.Order {
    seedSampleProducts();
    Lib.createOrder(orders, products, resellers, affiliateCodes, nextOrderId, input);
  };

  public query ({ caller }) func getOrdersByReseller() : async [Types.Order] {
    Lib.listOrdersByReseller(orders, caller);
  };

  public query ({ caller }) func getOrders() : async [Types.Order] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can list all orders");
    };
    Lib.listAllOrders(orders);
  };

  public shared ({ caller }) func updateOrderStatus(orderId : Common.OrderId, status : Common.OrderStatus) : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can update order status");
    };
    Lib.updateOrderStatus(orders, orderId, status);
  };

  // ── Init (seed on first admin action) ─────────────────────────────────────

  public shared ({ caller }) func initSampleProducts() : async () {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can seed products");
    };
    seedSampleProducts();
  };
};
