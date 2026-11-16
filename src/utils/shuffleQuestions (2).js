// Shuffle questions so correct answer is not always option A
export function shuffle(arr){const a=[...arr];for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function shuffleOpts(q){const texts=q.options.map(o=>o.replace(/^[A-D]\)\s*/,"").trim());const correct=texts[q.answer];const s=shuffle(texts);return{...q,options:s.map((t,i)=>`${String.fromCharCode(65+i)}) ${t}`),answer:s.indexOf(correct)};}
export function shuffleQuestions(qs){return shuffle(qs).map(shuffleOpts);}

