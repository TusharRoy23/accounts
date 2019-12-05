import SubHead from "@model/SubHead";
import SubSubHead from "@model/SubSubHead";

const createSubHead = async (req, res) => {
    const { head, subHead, subHeadStatus } = req.body;
    const create = await SubHead.create({
        HeadName: head,
        subHeadName: subHead,
        status: subHeadStatus
    });

    return res.status(201).json(create);
};

const getSubHeadList = async (req, res) => {
    const SubHeadList = await SubHead.find();
    return res.status(201).json(SubHeadList);
};

const updateStatus = async (req, res) => {
    let status = 0;
    if (!req.body.status) {
        status = 1;
    }
    const update = {
        status: status
    };
    const subhead = await SubHead.findOneAndUpdate(
        {_id:req.body.id}, update, { new: true}
    );

    res.status(201).json(subhead);
};

const updateSubHead = async (req, res) => {
    if (req.session.userId) {
        const update = {
            subHeadName: req.body.subHead
        };

        const subhead = await SubHead.findOneAndUpdate(
            {_id:req.body.id}, update, { new: true }
        );

        res.status(201).json(subhead);
    }
};

const deleteSubHead = async (req, res) => {
    if (req.session.userId) {
        const deleted = await SubHead.deleteOne(
            {_id:req.body.id}
        );
        
        return res.status(201).json(deleted);
    }
    else{
        return res.status(201).json(0);
    }
};

// Sub Sub Head

// const createSubSubHead = async (req, res) => {
//     const { subheadName, subSubHead, status } = req.body;
//     const create = await SubSubHead.create({
//         subHeadName: subheadName,
//         subSubHeadName: subSubHead,
//         status: status
//     });

//     return res.status(201).json(create);
// };

// const getSubSubHeadList = async (req, res) => {
//     const SubSubHeadList = await SubSubHead.find();
//     return res.status(201).json(SubSubHeadList);
// };

// const updateSubSubStatus = async (req, res) => {
//     let status = 0;
//     if (!req.body.status) {
//         status = 1;
//     }
//     const update = {
//         status: status
//     };
//     const subhead = await SubSubHead.findOneAndUpdate(
//         {_id:req.body.id}, update, { new: true}
//     );

//     res.status(201).json(subhead);
// };

// const updateSubSubHead = async (req, res) => {
//     if (req.session.userId) {
//         const update = {
//             subSubHeadName: req.body.subSubHead
//         };

//         const subhead = await SubSubHead.findOneAndUpdate(
//             {_id:req.body.id}, update, { new: true }
//         );

//         res.status(201).json(subhead);
//     }
// };

// const deleteSubSubHead = async (req, res) => {
//     if (req.session.userId) {
//         const deleted = await SubSubHead.deleteOne(
//             {_id:req.body.id}
//         );
        
//         return res.status(201).json(deleted);
//     }
//     else{
//         return res.status(201).json(0);
//     }
// };

export default {
    createSubHead,
    getSubHeadList,
    updateSubHead,
    deleteSubHead,
    updateStatus,
    // createSubSubHead,
    // getSubSubHeadList,
    // updateSubSubStatus,
    // updateSubSubHead,
    // deleteSubSubHead
};
