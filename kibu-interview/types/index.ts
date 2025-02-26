// /types/index.ts

export interface Member {
    id: string;
    firstName: string;
    lastName: string;
  }
  
  export interface Note {
    id: string;
    member: string; 
    text: string;
  }
  