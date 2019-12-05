import { Router } from 'express';

import subHeadController from '@controllers/v1/subhead.controller';
// import categoryValidator from '@validators/category';


const subHeadRouter = new Router();

subHeadRouter.post('/updateSubHead', subHeadController.updateSubHead);
subHeadRouter.post('/createSubHead', subHeadController.createSubHead);
subHeadRouter.get('/getSubHeadList', subHeadController.getSubHeadList);
subHeadRouter.post('/deleteSubHead', subHeadController.deleteSubHead);
subHeadRouter.post('/updateStatus', subHeadController.updateStatus);

// subHeadRouter.post('/updateSubSubHead', subHeadController.updateSubSubHead);
// subHeadRouter.post('/createSubSubHead', subHeadController.createSubSubHead);
// subHeadRouter.get('/getSubSubHeadList', subHeadController.getSubSubHeadList);
// subHeadRouter.post('/deleteSubSubHead', subHeadController.deleteSubSubHead);
// subHeadRouter.post('/updateSubSubStatus', subHeadController.updateSubSubStatus);

export default subHeadRouter;