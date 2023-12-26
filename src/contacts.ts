import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

interface Contact {
  id: string,
  name: string,
  email: string,
  phone: string,
}

const contactsPath: string = path.resolve("src", "db", "contacts.json");
// const updateContacts = async (data) =>
//   fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

export async function listContacts(): Promise<Contact[]> {
  
  const contacts = await fs.readFile(contactsPath, "utf-8");
  const parsedContacts: Contact[] = JSON.parse(contacts)
  return parsedContacts;
}

// export async function getContactById(contactId) {
//   const contacts = await listContacts();
//   const contact = contacts.find(({ id }) => contactId === id);
//   return contact || null;
// }

// export async function removeContact(contactId) {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex(({ id }) => id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const [deletedContact] = contacts.splice(idx, 1);
//   updateContacts(contacts);
//   return deletedContact;
// }

// export async function addContact(data) {
//   const contacts = await listContacts();
//   const newContact = { id: nanoid(), name: "", email: "", phone: "", ...data };
//   contacts.push(newContact);
//   updateContacts(contacts);
//   return newContact;
// }
