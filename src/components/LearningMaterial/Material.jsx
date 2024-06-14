import ReactMarkdown from "react-markdown";

export function BinarySearchMarkdown() {
  return (
    <div>
      <ReactMarkdown
        className="markdownBody"
        children={`
  # Binary Search Algorithm 
  Binary Search is a searching algorithm for finding an element's position in a sorted array. In this approach, the element is always searched in the middle of a portion of an array.
  
  Binary Search Algorithm can be implemented in two ways which are discussed below.
  
  * Iterative Method
  * Recursive Method (Divide and Conquer)
  
  ## Iterative approach 
  
  \`\`\`
  do until the pointers low and high meet each other.
      mid = (low + high)/2
      if (x == arr[mid])
          return mid
      else if (x > arr[mid]) // x is on the right side
          low = mid + 1
      else                       // x is on the left side
          high = mid - 1
  \`\`\`
  
  ## Recursive Approach 
  
  \`\`\`
  binarySearch(arr, x, low, high)
      if low > high
          return False 
      else
          mid = (low + high) / 2 
          if x == arr[mid]
              return mid
          else if x > arr[mid]        // x is on the right side
              return binarySearch(arr, x, mid + 1, high)
          else                               // x is on the right side
              return binarySearch(arr, x, low, mid - 1)
  \`\`\`
    
`}
      />
      <br />
      <h3>Clarify yours doubts on binary tree with our super model</h3>
      <br />
      <div>
        <input style={{ height: "30px", width: "1000px" }} />
        <button onClick={() => {}}>Get Data</button>
      </div>
    </div>
  );
}

export function MinSpanningTree() {
  return (
    <ReactMarkdown
      className="markdownBody"
      children={`

# Minimum Spanning Tree

A minimum spanning tree is a special kind of tree that minimizes the lengths (or “weights”) of the edges of the tree.
The minimum spanning tree from a graph is found using the following algorithms:
* Prim's Algorithm 
* Kruskal's Algorithm 

`}
    />
  );
}

export function PrimAlgo() {
  return (
    <ReactMarkdown
      className="markdownBody"
      children={`
## Prim's Algorithm 
Prim's algorithm is a minimum spanning tree algorithm that takes a graph as input and finds the subset of the edges of that graph which 
- form a tree that includes every vertex 
- has the minimum sum of weights among all the trees that can be formed from the graph

![Prims](https://github.com/Daima-Editor/AlgoViz/blob/main/prim-algo.gif?raw=true)

### Pseudo code for Prim's Algorithm 
\`\`\`
T = ∅;
U = { 1 };
while (U ≠ V)
    let (u, v) be the lowest cost edge such that u ∈ U and v ∈ V - U;
    T = T ∪ {(u, v)}
    U = U ∪ {v}
\`\`\`
  
  `}
    />
  );
}

export function Kruskal() {
  return (
    <ReactMarkdown
      className="markdownBody"
      children={`
## Kruskal's Algorithm 

Kruskal's algorithm is a minimum spanning tree algorithm that takes a graph as input and finds the subset of the edges of that graph which 
- form a tree that includes every vertex 
- has the minimum sum of weights among all the trees that can be formed from the graph

![lol](https://github.com/Daima-Editor/AlgoViz/blob/main/Kruskal-algo.gif?raw=true)

### Pseudo code for Kruskal's Algorithm 

\`\`\`
KRUSKAL(G):
A = ∅
For each vertex v ∈ G.V:
    MAKE-SET(v)
For each edge (u, v) ∈ G.E ordered by increasing order by weight(u, v):
    if FIND-SET(u) ≠ FIND-SET(v):       
    A = A ∪ {(u, v)}
    UNION(u, v)
return A
\`\`\`
    
`}
    />
  );
}

export function Knapsack() {
  return (
    <ReactMarkdown
      className="markdownBody"
      children={`
# Knapsack Problem 
It is an optimization technique that we can use to solve problems where the same work is being repeated over and over. A problem can be optimized using dynamic programming if it:

* Optimal substructure: 
Optimal substructure simply means that you can find the optimal solution to a problem by considering the optimal solution to its subproblems.
* Overlapping subproblems:
having overlapping subproblems means we are computing the same problem more than once. 


\`\`\`
//this function behaves like the V(i,c) method defined previously
//in this chapter
int V(int i, int c){
    //base cases
    if(i == 0 || c == 0){
        return 0;
    }
    //item does not fit case
    if(wt(i) > c){
        return V(i-1, c);
    }
    //compare best case if item i is taken or left behind.
    //and return the larger number.
    int B = V(i-1, c-wt(i)) + value(i);
    int A = V(i-1, c);
    if(A >= B){
        return A;
    }
    else{
        return B;
    }
}
\`\`\`
  
`}
    />
  );
}

export function Heaps() {
  return (
    <ReactMarkdown
      className="markdownBody"
      children={`
# Heaps (heap sort)
Heap sort is a comparison-based sorting technique based on Binary Heap data structure. 
The concept of heap sort is to eliminate the elements one by one from the heap part of the list, and then insert them into the sorted part of the list.

Min Heap: If the element at the root is less than or equal to all the other nodes.
Max Heap: If the element at the root is greater then or equal to all the other nodes.

### Pseudo code for Max Heap Sort Algorithm

\`\`\`
Heapify(A as array, n as int, i as int)
{
    max = i
    leftchild = 2i + 1
    rightchild = 2i + 2
    if (leftchild <= n) and (A[i] < A[leftchild])
        max = leftchild
    else 
        max = i
    if (rightchild <= n) and (A[max]  > A[rightchild])
        max = rightchild
    if (max != i)
        swap(A[i], A[max])
        Heapify(A, n, max)
}
Heapsort(A as array) 
{
   n = length(A)
   for i = n/2 downto 1   
     Heapify(A, n ,i)
   
   for i = n downto 2
     exchange A[1] with A[i]
     A.heapsize = A.heapsize - 1
     Heapify(A, i, 0)
}
\`\`\`
  `}
    />
  );
}

export function Material() {
  return <ReactMarkdown className="markdownBody" children={``} />;
}

export function Traveling() {
  return <ReactMarkdown className="markdownBody" children={`# Coming Soon`} />;
}
