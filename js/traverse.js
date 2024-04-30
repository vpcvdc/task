

const canvas = {
    "drawflow": {
        "Home": {
            "data": {
                "1": {
                    "id": 1,
                    "name": "Resources",
                    "data": {},
                    "class": "Resources",
                    "html": "Resources",
                    "typenode": false,
                    "inputs": {
                        "input_1": {
                            "connections": []
                        }
                    },
                    "outputs": {
                        "output_1": {
                            "connections": [
                                {
                                    "node": "2",
                                    "output": "input_1"
                                }
                            ]
                        }
                    },
                    "pos_x": 148,
                    "pos_y": 96
                },
                "2": {
                    "id": 2,
                    "name": "Decision",
                    "data": {},
                    "class": "Decision",
                    "html": "Decision",
                    "typenode": false,
                    "inputs": {
                        "input_1": {
                            "connections": [
                                {
                                    "node": "1",
                                    "input": "output_1"
                                }
                            ]
                        }
                    },
                    "outputs": {
                        "output_1": {
                            "connections": [
                                {
                                    "node": "3",
                                    "output": "input_1"
                                }
                            ]
                        },
                        "output_2": {
                            "connections": [
                                {
                                    "node": "4",
                                    "output": "input_1"
                                }
                            ]
                        }
                    },
                    "pos_x": 589,
                    "pos_y": 115
                },
                "3": {
                    "id": 3,
                    "name": "ReadFile",
                    "data": {},
                    "class": "ReadFile",
                    "html": "ReadFile",
                    "typenode": false,
                    "inputs": {
                        "input_1": {
                            "connections": [
                                {
                                    "node": "2",
                                    "input": "output_1"
                                }
                            ]
                        }
                    },
                    "outputs": {
                        "output_1": {
                            "connections": []
                        }
                    },
                    "pos_x": 981,
                    "pos_y": 85
                },
                "4": {
                    "id": 4,
                    "name": "Extract",
                    "data": {},
                    "class": "Extract",
                    "html": "Extract",
                    "typenode": false,
                    "inputs": {
                        "input_1": {
                            "connections": [
                                {
                                    "node": "2",
                                    "input": "output_2"
                                }
                            ]
                        }
                    },
                    "outputs": {
                        "output_1": {
                            "connections": []
                        }
                    },
                    "pos_x": 936,
                    "pos_y": 267
                }
            }
        }
    }
}



function traverse(canvas, datamodel,componentmaster) {


   var rootscope=[];;

    var currentscope=rootscope;

      var scopestack=[];
      var nodestack=[];

      var startnode= Object.values(canvas.drawflow.Home.data).filter((x) => {
        if (x.inputs.input_1.connections.length == 0) {
           return x;
        }});
      
      console.log(startnode,"This is ARRAY FILETER");

    // var startnode=[];
    // Object.keys(canvas.drawflow.Home.data).filter((x) => {
    //     if (canvas.drawflow.Home.data[x].inputs.input_1.connections.length == 0) {
    //         startnode.push(canvas.drawflow.Home.data[x]);
    //     }

    // });


    var currentNode={};

    if(startnode.length>1)
    {
    console.log(startnode, 'Multiple Start Node Present in the Canvas');

    return;
    }
else if(startnode.length==1)
{
console.log(startnode[0]);

currentNode=startnode[0];

var outerloop=true;

while(outerloop)
{
   outerloop=false;

 while(currentNode!=null && currentNode!= undefined )
 {

   // var _tempobject={ "ID":currentNode.id,"Name":currentNode.name};
   var _tempdatamodel=datamodel.get(currentNode.id);

    var_tempmcomponent= componentmaster.find((item)=>item.name==_tempdatamodel.componentName)
   var _tempobject=var_tempmcomponent?.action(_tempdatamodel.data);

    currentscope.push( _tempobject);

    var tempnodes=[];
    var nextnodeID=0;
     if(currentNode.name=="Decision")
     {
     //  currentscope= currentscope[currentNode.name+"_"+currentNode.id];
       _tempobject["true"]=[];
       _tempobject["false"]=[];

       currentscope= _tempobject["true"];

       scopestack.push(_tempobject["false"]);
       
       nodestack.push(currentNode);

       nextnodeID=Number(currentNode.outputs.output_1.connections.length==1?currentNode.outputs.output_1.connections[0].node:0);

        tempnodes= Object.values(canvas.drawflow.Home.data).filter((x) => {
        if (x.id == nextnodeID) {
           return x;
        }});
      
     }
     else
     {
        nextnodeID=Number(currentNode.outputs.output_1.connections.length==1?currentNode.outputs.output_1.connections[0].node:0);

        tempnodes= Object.values(canvas.drawflow.Home.data).filter((x) => {
        if (x.id == nextnodeID) {
           return x;
        }});

     }
     if(tempnodes.length>1)
     {
        console.log("Multipl Connection in Same Out Put");
        break;

     }
     else if(tempnodes.length==1)
     {
        currentNode =tempnodes[0];  
     }
     else if(tempnodes.length==0)
     {

      var _tempnode=  nodestack.pop();

      var _tempscope=scopestack.pop();

      //currentscope=_tempscope["false"];

      if(_tempnode!=null  &&_tempnode!=undefined )
      {

         currentNode=_tempnode;
         currentscope=_tempscope;

      nextnodeID=Number(currentNode.outputs.output_2.connections.length==1?currentNode.outputs.output_2.connections[0].node:0);

      
      tempnodes=Object.values(canvas.drawflow.Home.data).filter((x) => {
        if (x.id == nextnodeID) {
           return x;
        }});


        if(tempnodes.length>1)
        {
           console.log("Multipl Connection in Same Out Put");
           break;
   
        }
        else if(tempnodes.length==1)
        {
           currentNode =tempnodes[0];  
          
        }
        else
        {
          currentNode=null;
        }


    }
    else
    {
        currentNode=null;
    }


     }
    }

     var _tempnode=  nodestack.pop();

     var _tempscope=scopestack.pop();

     if(_tempnode!=null && _tempnode!=undefined)
     {

     currentscope=_tempscope["false"];


     nextnodeID=Number(currentNode.outputs.output_2.connections.length==1?currentNode.outputs.output_2.connections[0].node:0);

     
     tempnodes=Object.values(canvas.drawflow.Home.data).filter((x) => {
       if (x.id == nextnodeID) {
          return x;
       }});

       if(tempnodes.length>1)
     {
        console.log("Multipl Connection in Same Out Put");
        break;

     }
     else if(tempnodes.length==1)
     {
        currentNode =tempnodes[0];  
        outerloop=true;
     }
     else
     {
       outerloop=false;
     }
    }
    else
    {
        outerloop=false;   
    }
    }
     console.log("Traves Done");

     console.log(rootscope,"Main_Root_Scope");
     return rootscope;

}
}



function findstartnode(canvas) {

}

function testdata() 
{
    traverse(canvas)
}