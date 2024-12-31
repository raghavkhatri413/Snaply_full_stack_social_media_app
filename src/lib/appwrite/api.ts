import {ID} from 'appwrite';

import { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';
import { LucideTrophy } from 'lucide-react';
import { Query } from 'appwrite';

export async function createUserAccount(user:INewUser){
    try {
        const newAccount=await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );

        if(!newAccount) throw Error;

        const avatarUrl=avatars.getInitials(user.name);
        const avatarUrlObject=new URL(avatarUrl);

        const newUser=await saveUserToDB({
            accountId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrlObject,
            username: user.username,
        });
        return newUser;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user:{
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}){
    try {
        const newUser=await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        );
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

export async function signInAccount(user: {
    email: string;
    password: string
}){
    try {
        // First check if there's an active session and sign out if there is
        try {
            await account.deleteSession('current');
        } catch (error) {
            // Ignore error if no session exists
        }

        const session = await account.createEmailPasswordSession(
            user.email,
            user.password
        );
        return session;
    } catch (error) {
        console.log(error);
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount=await account.get();

        if(!currentAccount) throw Error;

        const currentUser=await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function signOutAccount(){
    try {
        const session=await account.deleteSession('current');
        return session;
    } catch (error) {
        console.log(error);
    }
}