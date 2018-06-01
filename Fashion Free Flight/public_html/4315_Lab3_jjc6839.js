
//Jossue Cervantes Torres
//ID#1000866839
var prodRows = document.getElementById("tbodyRows") ;
var prodRequest ;
var prodData ;
var sortOrder = "D" ;

prodRequest = new XMLHttpRequest( ) ;
btnID = new Button();
btnPrice = new Button();
btnName = new Button();
btnDesc = new Button();

// Account no Longer Available 
prodRequest.open('GET', 'https://mavspace.uta.edu/people/j/jj/jjc6839/products.json') ;
		
prodRequest.onload = function( )
{
	prodData = JSON.parse(prodRequest) ;
        
	renderTable(prodData) ;
} ;
	
prodRequest.send( ) ;
btnID.addEventListener("click", function( )
{				
	if (sortOrder === "A")
	{
		console.dir(prodData.sort(function(a,b)
		{
			return a.prodID > b.prodID ; 
		})) ;
		sortOrder = "D" ;
	}
	else
	{ 
		console.dir(prodData.sort(function(a,b)
			{return a.prodID > b.prodID ; }).reverse( )) ;	
		sortOrder = "A" ;
	}
	renderTable(prodData) ;
}) ;

btnPrice.addEventListener("click", function( )
{				
	if (sortOrder === "A")
	{
		console.dir(prodData.sort(function(a,b)
		{
			return a.prodPrice > b.prodPrice ; 
		})) ;
		sortOrder = "D" ;
	}
	else
	{ 
		console.dir(prodData.sort(function(a,b)
			{return a.prodPrice > b.prodPrice ; }).reverse( )) ;	
		sortOrder = "A" ;
	}
	renderTable(prodData) ;
}) ;

btnName.addEventListener("click", function( )
{
	alert("This button should sort by product name.");
}) ;

//event handler for Description button's click event (needs code added to actually sort by name)
btnDesc.addEventListener("click", function( )
{
	alert("This button should sort by product description.");
}) ;


function renderTable(data)
{
	var prodRowData = "<tbody>";
    for (i = 0; i < data.length; i++ )
	{
		prodRowData += "<tr><td>" + data[i].prodID + "</td><td>" + data[i].prodName + "</td><td>" + data[i].prodDesc + "</td><td> <img class =\"Image\" src=\""+data[i].Image +"\"></td><td>" + data[i].prodPrice  +"</td><td><form method = \"post\"><input type=\"integer\" name=\"qunatity\" value=\"0\"></form></td></tr>";
	}
	prodRows.innerHTML = prodRowData ;
} 
function saveQty()
{
	if (confirm('Are you sure you want to submit yout order?'))
        {
            var tblRows = document.getElementById("prodTable").rows;
            var prodQty;
            var prodObj = [] ;
            var prodJSON ;
            var iLowCount = 0 ;
            for(iRow = 1; iRow < tblRows.length; iRow++)
                {    
                    prodQty = tblRows[iRow].cells[5].firstChild.value;
                    if ( prodQty > 0 )
		{
			iLowCount ++ ;
			prodID = tblRows[iRow].cells[0].innerText ;
			prodObj.push({ "prodID":prodID, "prodQty":prodQty }) ;
		}
        }

	prodJSON = JSON.stringify(prodObj);
	localStorage.setItem("prodJSON", prodJSON);
        var retrievedObject = localStorage.getItem('prodJSON');
	
	console.log("there are " + iLowCount +" items being saved");
	console.log('retrievedObject',JSON.parse(retrievedObject));
	
	 
	document.getElementById("pLowQty").innerText = "There are " + iLowCount + " products with a low quantity on hand." ;
}else
    {
	console.log("user decide to cancel the order");
} 
}
function clearQty() 
{
	var tblRows = document.getElementById("prodTable").rows;

	for(iRow = 1; iRow <tblRows.length; iRow++)
	{
		qty= tblRows[iRow].cells[5];
		qty.innerHTML="<td><input type=\"text\" name=\"quantity\" value=\"0\"><td>";
	}
}
