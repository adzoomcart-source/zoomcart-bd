import Map "mo:core/Map";
import List "mo:core/List";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Types "types/products-resellers-orders";
import Common "types/common";
import ProductsResellersMixin "mixins/products-resellers-orders-api";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  let products = Map.empty<Common.ProductId, Types.Product>();
  let resellers = Map.empty<Principal, Types.Reseller>();
  let affiliateCodes = Map.empty<Text, Principal>();
  let orders = List.empty<Types.Order>();
  var nextProductId = { var value : Nat = 1 };
  var nextOrderId = { var value : Nat = 1 };

  include ProductsResellersMixin(
    accessControlState,
    products,
    resellers,
    affiliateCodes,
    orders,
    nextProductId,
    nextOrderId,
  );
};
