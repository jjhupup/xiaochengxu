const ApiRootUrl = 'https://huaronghr.com/api/';
// https://huaronghr.com/api/
// http://193.112.246.98:9527/api/
module.exports = {
  GetOpenId: ApiRootUrl + 'user/authSession',       //登录获取openid
  Publish:ApiRootUrl+'advice/publish',              //客户发布免费咨询
  GetCustomerWT: ApiRootUrl + 'advice/customer',    //获取客户自己的咨询列表
  GetAllQuestion: ApiRootUrl +'advice/all',         //获取全部咨询列表
  GetDetailQuestion: ApiRootUrl + 'advice/detail',  ///advice/detail
  Reply:ApiRootUrl+'advice/reply',                  //回复咨询
  GetMyMFZX: ApiRootUrl +'advice/customer',         //获取客户自己的免费咨询列表
  GetLawyerQuestion: ApiRootUrl +'user/relateReply',//获取律师的回复咨询列表
  UpDataUserData: ApiRootUrl +'user/update',        //更新用户信息 
  OrderPublish: ApiRootUrl + 'case/publish',       //发布文书起草，案件委托等需求
  GetOrderList: ApiRootUrl +'case/list',           //律师获取需求订单
  GetOrderDetail: ApiRootUrl +'case/detail',       //获取案件详情
  Baojia: ApiRootUrl +'case/bid',                  // 律师对订单报价
  GetCustomerOrderData: ApiRootUrl +'case/customerList',     //客户获取自己的需求订单
  GetLawyerListData: ApiRootUrl +'case/lawyerList',   //律师获取自己的需求订单
  GetUserData: ApiRootUrl +'user/detail',            //获取用户信息
  UpdateOrder: ApiRootUrl +'case/updateStatus',             //更新订单状态
  //支付接口！！！！
  GetPayParams: ApiRootUrl +'order/getPayParams',      //获取支付参数
  Withdrawal: ApiRootUrl +'order/applyWithdrawal',           //提现申请
  GetUserBalance: ApiRootUrl +'user/balance',            //获取余额
  ApplyRefund: ApiRootUrl +'order/applyRefund',         //用户申诉  
  // 文件上传
  FileUpload: ApiRootUrl +'files/upload',          //文件图片上传
};