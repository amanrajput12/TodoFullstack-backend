import { Client, Account, ID, Databases } from "appwrite";
const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('6504010d3e97b6c0c22c');
    


    export const Accountval = new Account(client);
    export const Databasesval = new Databases(client,'650311d1a2651c29d403')


    

    // b63e0875-15c2-4ac1-ae39-9849e3573440