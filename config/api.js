const ApiRootUrl = 'http://193.112.246.98:9527/api/';

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
  OrderPublish: ApiRootUrl + 'order/publish',       //发布文书起草，案件委托等需求
  GetOrderList: ApiRootUrl +'order/list',           //律师获取需求订单
  GetOrderDetail: ApiRootUrl +'order/detail',       //律师获取案件详情
  Baojia: ApiRootUrl +'order/bid',                  // 律师对订单报价
};