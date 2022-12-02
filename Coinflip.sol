pragma solidity ^0.7.0;

contract CoinFlip {
  // Variablen zum Speichern des aktuellen Kontostands und des aktuellen Einsatzes
  uint public balance;
  uint public bet;

  // Ereignis, das ausgelöst wird, wenn ein Benutzer seine Gewinne abzieht
  event Withdraw(uint amount);

  // Konstruktor, der den Anfangskontostand des Vertrags festlegt
  constructor() public {
    balance = 0;
  }

  // Funktion, die ETH an den Vertrag sendet und den aktuellen Kontostand erhöht
  function deposit() public payable {
    require(msg.value > 0, "Cannot deposit 0 ETH");
    balance += msg.value;
  }

  // Funktion, die den aktuellen Einsatz festlegt und einen Münzwurf durchführt
  function flip(uint _bet) public {
    require(_bet > 0 && _bet <= balance, "Invalid bet amount");
    bet = _bet;

    // Zufälliger Wert, der 0 oder 1 ist
    uint random = uint(keccak256(abi.encodePacked(now, msg.sender))) % 2;

    // Wenn der Wert 0 ist, verdoppelt sich der Einsatz, andernfalls geht er verloren
    if (random == 0) {
      balance += bet;
    } else {
      balance -= bet;
    }
  }

  // Funktion, die dem Benutzer seine Gewinne auszahlt
  function withdraw() public {
    require(balance > 0, "Cannot withdraw negative balance");

    // Auszahlung des aktuellen Kontostands und Auslösen des Withdraw-Ereignisses
    uint amount = balance;
    balance = 0;
    emit Withdraw(amount);
  }
}