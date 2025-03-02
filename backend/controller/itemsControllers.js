import Item from "../models/itemSchema.js"

const getAllItems=async (req,res)=>{
    try{

        const items=await Item.find()
        return res.status(200).json({message:"Items found sucessfully",items:items})
    }catch(err){
        res.status(500).json({message:"Server error",error:err})
    }
}
const getItemById=async (req,res)=>{
    try{
       const item=await Item.findById(req.params.id)
       if(!item){
        return res.status(400).json({message:"Item not found"})
       }
       res.status(200).json({item})
    }catch(err){
        res.status(500).json({message:"Server error",error:err})

    }
}
const createItem=async (req,res)=>{
    try{
          const {name,description,price,category}=req.body
          const item=new Item({
            name,
            description,
            price,
            category,
            createdBy:req.user.id
          })
          await item.save()
          res.status(200).json({message:"Items created successfully",item})
    }catch(err){
        res.status(500).json({message:"Server error",error:err})

    }
}

const updateItem=async (req,res)=>{
    try{
    const {name,description,price,category}=req.body
    const item=await Item.findById(req.params.id)
    if(!item){
        return res.status(400).json({message:"Item not found"})
    }
    if(item.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
        return res.status(400).json({message:"Not authorized"})
    }
    item.name=name || item.name,
    item.description=description || item.description,
    item.price=price || item.price,
    item.category=category || item.category,
    await  item.save()
    res.status(200).json({message:"Item updated successfully",item})
}catch(err){
    res.status(500).json({message:"Server error",error:err})

}
}

const deleteItem=async(req,res)=>{
    try{

        const item=await Item.findById(req.params.id)
        if(!item){
            return res.status(400).json({message:"Item not found"})

        }
        if(item.createdBy.toString()!==req.user.id && req.user.role!=="admin"){
            return res.status(400).json({message:"Not authorized"})
        }
        await Item.findByIdAndDelete(req.params.id)
        res.status(200).json({message:"Item deleted successfully"})
    }catch(err){
        console.log(err);
        
        res.status(500).json({message:"Server error",error:err})

    }
}

export {deleteItem,createItem,updateItem,getItemById,getAllItems}