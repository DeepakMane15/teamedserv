import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private dbPath = '/groups';

  tutorialsRef!: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.tutorialsRef = db.collection(this.dbPath);

   }
   getAll(): AngularFirestoreCollection<any> {
    return this.tutorialsRef;
  }

  async createNewUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(email, password);
      console.log('New user created:', userCredential.user);
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }

}
