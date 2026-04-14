import Common "common";

module {
  // ── Products ──────────────────────────────────────────────────────────────

  public type Product = {
    id : Common.ProductId;
    name : Text;
    category : Common.ProductCategory;
    price : Nat;
    commission : Nat;
    description : Text;
    imageUrl : Text;
    isFeatured : Bool;
    createdAt : Common.Timestamp;
  };

  public type ProductInput = {
    name : Text;
    category : Common.ProductCategory;
    price : Nat;
    commission : Nat;
    description : Text;
    imageUrl : Text;
    isFeatured : Bool;
  };

  // ── Resellers ─────────────────────────────────────────────────────────────

  public type Reseller = {
    principal : Principal;
    name : Text;
    email : Text;
    affiliateCode : Text;
    registeredAt : Common.Timestamp;
    isApproved : Bool;
  };

  public type ResellerProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    affiliateCode : Text;
    registeredAt : Common.Timestamp;
    isApproved : Bool;
    totalSales : Nat;
    totalEarnings : Nat;
  };

  public type ResellerInput = {
    name : Text;
    email : Text;
  };

  // ── Orders ────────────────────────────────────────────────────────────────

  public type Order = {
    id : Common.OrderId;
    productId : Common.ProductId;
    resellerPrincipal : Principal;
    customerName : Text;
    customerPhone : Text;
    orderDate : Common.Timestamp;
    commissionAmount : Nat;
    status : Common.OrderStatus;
  };

  public type OrderInput = {
    productId : Common.ProductId;
    resellerAffiliateCode : Text;
    customerName : Text;
    customerPhone : Text;
  };
};
