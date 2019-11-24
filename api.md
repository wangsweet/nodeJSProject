# 注册接口
- 请求方式:POST
- 请求地址:/users/register
- 请求的参数

字段名称     字段类型     是否必填      参数说明
username     string        Y          用户名称
password     string        Y          用户密码

- 返回值得参数

字段名称     字段类型     参数说明
code         number      状态码
errMsg       string      报错信息
data         object      info:"注册成功" status:  1 成功  2用户名重复  0 系统错误