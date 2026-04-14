import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Types "../types/products-resellers-orders";
import Common "../types/common";

module {

  // ── Products ──────────────────────────────────────────────────────────────

  public func addProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    nextId : { var value : Nat },
    input : Types.ProductInput,
  ) : Types.Product {
    let id = nextId.value;
    nextId.value += 1;
    let product : Types.Product = {
      id;
      name = input.name;
      category = input.category;
      price = input.price;
      commission = input.commission;
      description = input.description;
      imageUrl = input.imageUrl;
      isFeatured = input.isFeatured;
      createdAt = Time.now();
    };
    products.add(id, product);
    product;
  };

  public func updateProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
    input : Types.ProductInput,
  ) : Types.Product {
    let existing = switch (products.get(id)) {
      case (?p) p;
      case null Runtime.trap("Product not found");
    };
    let updated : Types.Product = {
      existing with
      name = input.name;
      category = input.category;
      price = input.price;
      commission = input.commission;
      description = input.description;
      imageUrl = input.imageUrl;
      isFeatured = input.isFeatured;
    };
    products.add(id, updated);
    updated;
  };

  public func deleteProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) {
    switch (products.get(id)) {
      case null Runtime.trap("Product not found");
      case (?_) products.remove(id);
    };
  };

  public func getProduct(
    products : Map.Map<Common.ProductId, Types.Product>,
    id : Common.ProductId,
  ) : ?Types.Product {
    products.get(id);
  };

  public func listProducts(
    products : Map.Map<Common.ProductId, Types.Product>,
  ) : [Types.Product] {
    products.values().toArray();
  };

  public func listProductsByCategory(
    products : Map.Map<Common.ProductId, Types.Product>,
    category : Common.ProductCategory,
  ) : [Types.Product] {
    products.values().filter(func(p) { p.category == category }).toArray();
  };

  public func searchProducts(
    products : Map.Map<Common.ProductId, Types.Product>,
    searchTerm : Text,
  ) : [Types.Product] {
    let lower = searchTerm.toLower();
    products.values().filter(func(p) {
      p.name.toLower().contains(#text lower) or p.description.toLower().contains(#text lower)
    }).toArray();
  };

  // ── Resellers ─────────────────────────────────────────────────────────────

  public func generateAffiliateCode(principal : Principal) : Text {
    let raw = principal.toText();
    // Take last 8 chars of principal text for brevity
    let size = raw.size();
    let sliceSize = 8;
    let start : Int = if (size > sliceSize) { size.toInt() - sliceSize } else { 0 };
    let chars = raw.toArray();
    let slice = chars.sliceToArray(start, size.toInt());
    "ZC-" # Text.fromArray(slice);
  };

  public func registerReseller(
    resellers : Map.Map<Principal, Types.Reseller>,
    affiliateCodes : Map.Map<Text, Principal>,
    caller : Principal,
    input : Types.ResellerInput,
  ) : Types.Reseller {
    // Prevent duplicate registration
    switch (resellers.get(caller)) {
      case (?_) Runtime.trap("Already registered as reseller");
      case null {};
    };
    let code = generateAffiliateCode(caller);
    let reseller : Types.Reseller = {
      principal = caller;
      name = input.name;
      email = input.email;
      affiliateCode = code;
      registeredAt = Time.now();
      isApproved = false;
    };
    resellers.add(caller, reseller);
    affiliateCodes.add(code, caller);
    reseller;
  };

  public func getReseller(
    resellers : Map.Map<Principal, Types.Reseller>,
    principal : Principal,
  ) : ?Types.Reseller {
    resellers.get(principal);
  };

  public func listResellers(
    resellers : Map.Map<Principal, Types.Reseller>,
  ) : [Types.Reseller] {
    resellers.values().toArray();
  };

  public func approveReseller(
    resellers : Map.Map<Principal, Types.Reseller>,
    principal : Principal,
  ) {
    let existing = switch (resellers.get(principal)) {
      case (?r) r;
      case null Runtime.trap("Reseller not found");
    };
    resellers.add(principal, { existing with isApproved = true });
  };

  public func unapproveReseller(
    resellers : Map.Map<Principal, Types.Reseller>,
    principal : Principal,
  ) {
    let existing = switch (resellers.get(principal)) {
      case (?r) r;
      case null Runtime.trap("Reseller not found");
    };
    resellers.add(principal, { existing with isApproved = false });
  };

  public func getResellerProfile(
    resellers : Map.Map<Principal, Types.Reseller>,
    orders : List.List<Types.Order>,
    principal : Principal,
  ) : ?Types.ResellerProfile {
    switch (resellers.get(principal)) {
      case null null;
      case (?reseller) {
        // Compute stats from orders
        let resellerOrders = orders.filter(func(o : Types.Order) : Bool {
          Principal.equal(o.resellerPrincipal, principal)
        });
        let totalSales = resellerOrders.size();
        let totalEarnings = resellerOrders.foldLeft(
          0,
          func(acc : Nat, o : Types.Order) : Nat { acc + o.commissionAmount },
        );
        ?{
          principal = reseller.principal;
          name = reseller.name;
          email = reseller.email;
          affiliateCode = reseller.affiliateCode;
          registeredAt = reseller.registeredAt;
          isApproved = reseller.isApproved;
          totalSales;
          totalEarnings;
        };
      };
    };
  };

  // ── Orders ────────────────────────────────────────────────────────────────

  public func createOrder(
    orders : List.List<Types.Order>,
    products : Map.Map<Common.ProductId, Types.Product>,
    resellers : Map.Map<Principal, Types.Reseller>,
    affiliateCodes : Map.Map<Text, Principal>,
    nextId : { var value : Nat },
    input : Types.OrderInput,
  ) : Types.Order {
    let product = switch (products.get(input.productId)) {
      case (?p) p;
      case null Runtime.trap("Product not found");
    };
    let resellerPrincipal = switch (affiliateCodes.get(input.resellerAffiliateCode)) {
      case (?p) p;
      case null Runtime.trap("Invalid affiliate code");
    };
    // Ensure reseller is approved
    switch (resellers.get(resellerPrincipal)) {
      case (?r) {
        if (not r.isApproved) Runtime.trap("Reseller is not approved");
      };
      case null Runtime.trap("Reseller not found");
    };
    let id = nextId.value;
    nextId.value += 1;
    let order : Types.Order = {
      id;
      productId = input.productId;
      resellerPrincipal;
      customerName = input.customerName;
      customerPhone = input.customerPhone;
      orderDate = Time.now();
      commissionAmount = product.commission;
      status = #pending;
    };
    orders.add(order);
    order;
  };

  public func updateOrderStatus(
    orders : List.List<Types.Order>,
    orderId : Common.OrderId,
    status : Common.OrderStatus,
  ) {
    let found = orders.findIndex(func(o : Types.Order) : Bool { o.id == orderId });
    switch (found) {
      case null Runtime.trap("Order not found");
      case (?idx) {
        let existing = orders.at(idx);
        orders.put(idx, { existing with status });
      };
    };
  };

  public func getOrder(
    orders : List.List<Types.Order>,
    orderId : Common.OrderId,
  ) : ?Types.Order {
    orders.find(func(o : Types.Order) : Bool { o.id == orderId });
  };

  public func listAllOrders(
    orders : List.List<Types.Order>,
  ) : [Types.Order] {
    orders.toArray();
  };

  public func listOrdersByReseller(
    orders : List.List<Types.Order>,
    resellerPrincipal : Principal,
  ) : [Types.Order] {
    orders.filter(func(o : Types.Order) : Bool {
      Principal.equal(o.resellerPrincipal, resellerPrincipal)
    }).toArray();
  };
};
