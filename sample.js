

var fs = require('fs');
	var readfile= fs.createReadStream('FoodFacts.csv','utf-8');
	var data= '';

	readfile.on('data', function(chunk) {
		data+=chunk;

		
	});
	readfile.on('end',function(){
		
		           var countries=['Netherlands','Canada','United Kingdom','United States','Australia','France','Germany','Spain','South Africa'];
		           var saltcontent=new Uint8Array(9);
                   var sugarcontent=new Uint8Array(9);


		
		           var northEurope=['United Kingdom', 'Denmark', 'Sweden','Norway'];
		           var centralEurope=['France', 'Belgium', 'Germany', 'Switzerland','Netherlands'];
		           var southEurope=['Portugal', 'Greece', 'Italy', 'Spain', 'Croatia','Albania'];
                   var fatcontentNorth=0,carbocontentNorth=0,proteincontentNorth=0;
                   var fatcontentCentral=0,carbocontentCentral=0,proteincontentCentral=0;
                   var fatcontentSouth=0,carbocontentSouth=0,proteincontentSouth=0;
       

        
                   var sepLines=data.split("\n");
                   var sepTitle=sepLines[0].split(",");
                   countryIndex = sepTitle.indexOf("countries_en");
		           saltIndex = sepTitle.indexOf("salt_100g");
		           sugarIndex = sepTitle.indexOf("sugars_100g");
		           proteinIndex =sepTitle.indexOf("proteins_100g");
		           carboIndex =sepTitle.indexOf("carbohydrates_100g");
		           fatIndex =sepTitle.indexOf("fat_100g");
		           var part1=[];
		           var part2=[];


   
  for(var i=1;i<sepLines.length;i++)
     {
 	                    var viewline=sepLines[i].split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
 	                    var flag1 = countries.includes(viewline[countryIndex]);
                        var flag2 = northEurope.includes(viewline[countryIndex]);
	                    var flag3 = centralEurope.includes(viewline[countryIndex]);
	                    var flag4 = southEurope.includes(viewline[countryIndex]);
	  if(flag1)
	   {
                        var  index = countries.indexOf(viewline[countryIndex]);
                        var saltvalue = viewline[saltIndex];
                        var sugarvalue=viewline[sugarIndex];
          
            if(saltvalue=="")
			          	saltvalue=0;
        
            if(sugarvalue=="")
				      sugarvalue=0;
		
	   
	   saltcontent[index] = saltcontent[index]+parseFloat(saltvalue);
	   sugarcontent[index] = sugarcontent[index]+parseFloat(sugarvalue);

	
	 }

    
     if(flag2)
		   
	  {
			
                       var fatNE = viewline[fatIndex];
			           var proteinNE=viewline[proteinIndex];
			           var carboNE=viewline[carboIndex];
			
			if(fatNE=="")
				       fatNE=0;
			
			if(carboNE=="")
				       carboNE=0;
			           
			if(proteinNE=="")
				       proteinNE=0;

	   fatcontentNorth+=parseFloat(fatNE);
       carbocontentNorth+=parseFloat(carboNE);
	   proteincontentNorth+=parseFloat(proteinNE);
			
						
	}
	
	

	if(flag3)
		{
			          var fatCE =viewline[fatIndex];
			          var proteinCE=viewline[proteinIndex];
			          var carboCE=viewline[carboIndex];
			
			if(fatCE=="")
				       fatCE=0;
			          
			if(proteinCE=="")
				       proteinCE=0;
			
			if(carboCE=="")
				        carboCE=0;
			          
		fatcontentCentral+=parseFloat(fatCE);
	    proteincontentCentral+=parseFloat(proteinCE);
	    carbocontentCentral+=parseFloat(carboCE);
			
		}
	


	if(flag4)
		{
			         var fatSE =viewline[fatIndex];
			         var proteinSE=viewline[proteinIndex];
			         var carboSE=viewline[carboIndex];
		  if(fatSE=="")
				      fatSE=0;
			        
	      if(proteinSE=="")
				        proteinSE=0;
			        
		  if(carboSE=="")
				        carboSE=0;
			        
	  fatcontentSouth+=parseFloat(fatSE);
	  proteincontentSouth+=parseFloat(proteinSE);
	  carbocontentSouth+=parseFloat(carboSE);
			
		}
	}


	
	for(var i=0;i<countries.length;i++)
	     {
		             var obj = {};
		             obj["country"] = countries[i];
		             obj["salt"] = saltcontent[i];
		             obj["sugar"] = sugarcontent[i];
		             part1.push(obj);
		             console.log(part1);
		             
	     }
	
	       var northobj = {};
	                northobj["country"] = "northEurope";
	                northobj["Fat"] = fatcontentNorth;
	                northobj["Protein"] = proteincontentNorth;
	                northobj["carbohydrates"] = carbocontentNorth;
	                part2.push(northobj);
	                console.log(part2);

	       var centralobj= {};
	                centralobj["country"] = "centralEurope";
	                centralobj["Fat"] = fatcontentCentral;
	                centralobj["Protein"] = proteincontentCentral;
	                centralobj["carbohydrates"] = carbocontentCentral;
         	        part2.push(centralobj);
         	        console.log(part2);
 
	       var southobj={};
	               southobj["country"] = "southEurope";
	               southobj["Fat"] = fatcontentSouth;
	               southobj["Protein"] = proteincontentSouth;
	               southobj["carbohydrates"] = carbocontentSouth;
	               part2.push(southobj);
	               console.log(part2);

	  

	   fs.writeFile('part1.json', JSON.stringify(part1),'utf-8');
	   fs.writeFile('part2.json',JSON.stringify(part2),'utf-8');
  });
	