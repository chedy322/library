const fs = require("fs");
const csv = require("csv-parser");
const  { v4: uuidv4 }=require('uuid')
const { parse } = require("json2csv");
const { saveLibraries, readLibraries } = require("../static/util");

// req on the libraries
const get_libraries=async(req,res)=>{
    try {
        let results=[]
        // this variable is for the the object later
        let wifi="Wi-Fi"
        // readign the file
        fs.createReadStream('dataset/urbino_dataset.csv')
        .pipe(csv())
        .on("data",(row)=>{
            results.push({
                id: row.Zip,
                name: row.Branch,
                city:row.City,
                webpage:row.Webpage,
                phone:row.Phone,
                wifi:row[wifi],
                computers:row.Computers,
                location: row.Address,
              });
        }).on("end",()=>{
            if (results.length === 0) {
                return res.status(404).json({ message:"Libraries not found" });
              }
            return res.json(results);
        }).on("error",(err)=>{
            console.error("CSV read error:", err);
      return res.status(500).json({ message:"Failed to read data file" });
        })
    }catch(err){
        console.log(err)
        return res.status(400).json(({
            message:"Error finding Libraries"
        }))
    }
}

const get_library=async(req,res)=>{
    try{
        const {id}=req.params
        if(!id){
            return res.status(400).json(({
                message:"Please provide the id for the library"
            }))
        }
        let results=[]
        // this variable is for the the object later
        let wifi="Wi-Fi"
        // loook for in the file with the id
          fs.createReadStream("dataset/urbino_dataset.csv") 
    .pipe(csv())
    .on("data", (row) => {
      if (row.Zip === id) {
        results.push({
            id: row.Zip,
            name: row.Branch,
            city:row.City,
            webpage:row.Webpage,
            phone:row.Phone,
            wifi:row[wifi],
            computers:row.Computers,
            location: row.Address,
        });
      }
    })
    .on("end", () => {
      if (results.length === 0) {
        return res.status(404).json({ message:"Library not found" });
      }
      res.json(results[0]);
    })
    .on("error", (err) => {
      console.error("CSV read error:", err);
      res.status(500).json({ message:"Failed to read data file" });
    });
    }catch(err){
        console.log(err)
        return res.status(400).json(({
            message:"Error finding Library"
        }))
    }
}

const create_library=async(req,res)=>{
    try {
      console.log(req.body)
        const { ...form } = req.body;
        console.log(form)
        if (!form) {
          return res.status(400).json({ message: "Please provide library data" });
        }
        const libraries = await readLibraries();
        const newLibrary = {
          Zip: uuidv4(), // generating unique id (using Zip fifeld as unique id)
          name: form.name,
          address: form.address,
          city: form.city,
          webpage: form.webpage,
          phone: form.phone,
          wifi: form.wifi || "n",
          computers: form.computers || "0",
        };
    
        libraries.push(newLibrary);
        await saveLibraries(libraries);
    
        return res.status(201).json({ message:"Library created", library: newLibrary });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message:"Error adding Library" });
      }
}
const delete_library=async(req,res)=>{
    try {
        const { id } = req.params;
        if (!id) {
          return res.status(400).json({ message:"Please provide id for the library" });
        }
    
        const libraries = await readLibraries();
        const filtered = libraries.filter(lib => lib.Zip !== id);
    
        if (filtered.length === libraries.length) {
          return res.status(404).json({ message:"Library not found" });
        }
    
        await saveLibraries(filtered);
    
        return res.status(200).json({ message:"Library deleted successfully" });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message:"Error deleting Library" });
      }
}
const update_library=async(req,res)=>{
    try {
        // the library id (as zip in row)
        const { id } = req.params;
        const { form } = req.body;
    console.log("form",form)
        if (!id || !form) {
          return res.status(400).json({ message:"Please provide id and form data" });
        }
    
        const libraries = await readLibraries();
        const index = libraries.findIndex(lib => lib.Zip === id);
    
        if (index === -1) {
          return res.status(404).json({ message:"Library not found" });
        }
        // Updating the fields
        libraries[index] = {
          ...libraries[index],
          ...form,
          Zip: libraries[index].Zip
        };
        console.log("after changes: ",libraries[index])
        await saveLibraries(libraries);
        return res.status(200).json({ message:"Library updated successfully", library: libraries[index] });
      } catch (err) {
        console.error(err);
        return res.status(400).json({ message:"Error updating Library" });
      }
}

// search library based on city
const search_by_name=async (req,res)=>
{
  try{
    const {city}=req.query
    console.log(city)
    if(!city){
      return res.status(404).json({
        message:"Invalid request,city required"
      })
    }
    let results=[]
    // this variable is for the the object later
    let wifi="Wi-Fi"
    // loook for in the file with the id
      fs.createReadStream("dataset/urbino_dataset.csv") 
.pipe(csv())
.on("data", (row) => {
  // convert the both name to min so can find the match
  const min_input=city.toLowerCase()
  const min_existing_city=row.City.toLowerCase()
  if (min_input === min_existing_city) {
    results.push({
        id: row.Zip,
        name: row.Branch,
        city:row.City,
        webpage:row.Webpage,
        phone:row.Phone,
        wifi:row[wifi],
        computers:row.Computers,
        location: row.Address,
    });
  }
})
.on("end", () => {
  console.log(results)
  return res.status(200).json(results);
})
.on("error", (err) => {
  console.error("CSV read error:", err);
  res.status(500).json({ message:"Failed to read data file" });
});
  }catch(err){
    console.log(err)
    return res.status(400).json({ message:"Error updating Library" });
  }
}
module.exports={get_libraries,get_library,update_library,delete_library,create_library,search_by_name}


