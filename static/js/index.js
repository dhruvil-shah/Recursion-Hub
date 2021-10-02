    
    const Count=document.querySelector('.count');
    const listData=document.querySelector('.container-list');
    const Input=document.querySelector('.input');
    let list=[]
    axios.get('/list').then((res)=>{
        list=res.data;
        SetData(list)
    })
    
    function SetData(list){
        
        Count.innerHTML=list.length;

        
        const toadd=list.map((data,index)=>{

            
            
            return `
            <div class="item">
                
                <div class="row">
                    <h3>${data.data.Name}</h3>
                    <a href="${data.data.Github}">Github</a>
                <a href="${data.data.WebSite}">WebSite </a>
            </div>
            
            <div>Problem:${data.data.Problem}</div>
            <div>Description:${data.data.Description}</div>
            <div>Explain:
                ${data.data.Explanation || '#'}

                
                
            </div>
            <p>
                <a class="btn btn-primary" data-bs-toggle="collapse" href=${"#collapseExample"+index} role="button" aria-expanded="false" aria-controls=${"collapseExample"+index}
                >
                    Code
                </a>
                
            </p>
            <div class="collapse" id=${"collapseExample"+index}>
                <div class="card card-body">
                    <pre class="language-${data.data.Language || 'bash'}"><code >
                        
                        ${
                            
                            data.content.split("```")[1].substr(data.content.split("```")[1].indexOf("\n"))
                            
                            
                        }
                        
                        
                    </code>
                    
                </pre>
            </div>
            </div>
        </div>
        `
        
    }).join(' ');
    
    listData.innerHTML=toadd;
}

function SetList(e){

if(Input.value=="") return SetData(list);
  const q=  new RegExp(Input.value, 'gi');
  
  const newlist=list.filter((data)=>{
    

    return data.data.Name.match(q) || data.data.Problem.match(q);
  })
  SetData(newlist);
}