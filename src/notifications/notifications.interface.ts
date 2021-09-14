interface Content {
    content: string;
}

interface EmailContent extends Content {
    address: string;
    object: string;
    body: string;
}