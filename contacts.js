const fs = require("fs").promises;
const path = require("path");

const contactPath = path.join (__dirname,"db","contact.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function getContactById(contactId){
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    return contacts.find((contact) => contact.id === contactId) || null;
  } catch (error) {
    return null;
  }
}



async function removeContact(contactId){
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index !== -1) {
      const removeContactSplice = contacts.splice(index, 1);
      await fs.writeFile(
        contactPath,
        JSON.stringify(contacts,null, 2),
        "utf-8"
      );
      return removeContactSplice[0];
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}


async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactPath, "utf-8");
    const contacts = JSON.parse(data);
    const newContact = { id: Date.now(), name, email, phone };
    contacts.push(newContact);
    await fs.writeFile(
      contactPath,
      JSON.stringify(contacts, null, 2),
      "utf-8"
    );
    return newContact;
  } catch (error) {
    return null;
  }
}

module.exports = {listContacts, getContactById, removeContact, addContact}