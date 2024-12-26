import {ID} from 'appwrite';

import { INewUser } from '@/types';
import { account, appwriteConfig, avatars, databases } from './config';

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
            accoutId: newAccount.$id,
            email: newAccount.email,
            name: newAccount.name,
            imageUrl: avatarUrlObject,
            username: user.username,
        });
        return newAccount;

        
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function saveUserToDB(user:{
    accoutId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}){
    try {
        const newUser=databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
    } catch (error) {
        console.log(error);
    }
}