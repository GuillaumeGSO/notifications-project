export interface Content {
  content: string;
}

export interface EmailContent extends Content {
  address: string;
  object: string;
  body: string;
}
