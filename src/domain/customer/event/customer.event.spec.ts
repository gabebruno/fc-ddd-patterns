import EventDispatcher from "../../@shared/event/event-dispatcher";
import Address from "../value-object/address";
import Customer from "../entity/customer";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import EnviaConsoleLog1Handler from "./handler/envia-console-log1.handler";
import EnviaConsoleLog2Handler from "./handler/envia-console-log2.handler";
import EnviaConsoleLogHandler from "./handler/envia-console-log.handler";

describe("Customer events tests", () => {
  it("should notify both handlers when a customer is created", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler1 = new EnviaConsoleLog1Handler();
    const eventHandler2 = new EnviaConsoleLog2Handler();

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");
    const spyConsoleLog = jest.spyOn(console, "log").mockImplementation();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const customer = new Customer("1", "Customer 1");
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
    });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Esse é o primeiro console.log do evento: CustomerCreated"
    );
    expect(spyConsoleLog).toHaveBeenCalledWith(
      "Esse é o segundo console.log do evento: CustomerCreated"
    );

    spyConsoleLog.mockRestore();
  });

  it("should notify handler when customer address changes", () => {
    const eventDispatcher = new EventDispatcher();

    const eventHandler = new EnviaConsoleLogHandler();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");
    const spyConsoleLog = jest.spyOn(console, "log").mockImplementation();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const customer = new Customer("1", "Customer 1");
    const address = new Address("Street 1", 10, "12345-000", "City 1");
    customer.changeAddress(address);

    const addressString = `${address.street}, ${address.number}, ${address.zip}, ${address.city}`;

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      id: customer.id,
      name: customer.name,
      address: addressString,
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${addressString}`
    );

    spyConsoleLog.mockRestore();
  });
});
