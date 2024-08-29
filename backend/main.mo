import Error "mo:base/Error";

import Float "mo:base/Float";
import Text "mo:base/Text";

actor Calculator {
  public func calculate(operation: Text, x: Float, y: Float) : async Float {
    switch (operation) {
      case ("add") { x + y };
      case ("subtract") { x - y };
      case ("multiply") { x * y };
      case ("divide") {
        if (y == 0) {
          throw Error.reject("Division by zero");
        };
        x / y
      };
      case (_) {
        throw Error.reject("Invalid operation");
      };
    }
  };
}