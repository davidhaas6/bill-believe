
interface Bill {
  Democrat: number,                 
  Republican: string,               
  Independant: string,              
  Sponsor_Party: string,                  
  Bipartisan: string,               
  Number_Cosponsors: string,                   
  Number_Cosponsor_States: string,                   
  slug: string,                     
  subjects: string,      

  raw_prediction: number,           
  final_prediction: string
}

export default Bill;