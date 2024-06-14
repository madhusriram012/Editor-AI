import SyntaxHighlighter from "react-syntax-highlighter";
import { docco } from "react-syntax-highlighter/dist/esm/styles/hljs";

export default function BubbleSort() {
  const codeString = `
  // Bubble Sort

  #include<stdio.h>    
  void print(int a[], int n) //function to print array elements  
  {  
    int i;  
    for(i = 0; i < n; i++){    
        printf("%d ",a[i]);    
    }        
  } 

  void bubble(int a[], int n) // function to implement bubble sort  
  {  
    int i, j, temp;  
    for(i = 0; i < n; i++)    
      {    
        for(j = i+1; j < n; j++)    
          {    
            if(a[j] < a[i])    
            {    
              temp = a[i];    
              a[i] = a[j];    
              a[j] = temp;     
            }     
          }     
      }     
  }

  void main ()   
  {    
      int i, j,temp;     
      int a[5] = { 10, 35, 32, 13, 26};     
      int n = sizeof(a)/sizeof(a[0]);   
      printf("Before sorting array elements are - ");  
      print(a, n);  
      bubble(a, n);  
      printf("After sorting array elements are -");    
      print(a, n);  
  } 

`;
  return (
    <SyntaxHighlighter language="java" style={docco}>
      {codeString}
    </SyntaxHighlighter>
  );
}
