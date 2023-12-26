import { OptionValues, program } from "commander";
import * as conactsServices from "./contacts.js";
import { Action, Contact } from "./types.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <id>", "user id")
  .option("-n, --name <name>", "user name")
  .option("-e, --email <email>", "user email")
  .option("-p, --phone <phone>", "user phone");

program.parse();

const argv: OptionValues & { action: Action } = program.opts();

async function invokeAction(arg: OptionValues): Promise<void> {
  const { action, id, name, email, phone } = arg;
  const data: Omit<Contact, "id"> = { name, email, phone };
  switch (action) {
    case "list":
      const contactsList: Contact[] = await conactsServices.listContacts();
      return console.log(contactsList);

    case "get":
      const contact: Contact | null = await conactsServices.getContactById(id);
      return console.log(contact);

    case "add":
      const newContact: Contact = await conactsServices.addContact(data);
      return console.log(newContact);

    case "remove":
      const deletedContact: Contact | null =
        await conactsServices.removeContact(id);
      return console.log(deletedContact);

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
