module {
  public type Timestamp = Int;
  public type ProductId = Nat;
  public type OrderId = Nat;

  public type ProductCategory = {
    #fan;
    #kitchen;
    #health;
    #gadgets;
  };

  public type OrderStatus = {
    #pending;
    #completed;
    #paid;
  };
};
