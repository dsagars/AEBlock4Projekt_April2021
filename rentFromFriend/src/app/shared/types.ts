//Interfaces von Typen Objecten die wir an verscheidenen Orten benötigen


//Type ist noch vorläufig
export interface product {
  id: string;
  title: string;
  description: string;
  price: string;
  categorie?: string;
  city: string;
  discrict: string;
  friendsOnly?: boolean;
}
