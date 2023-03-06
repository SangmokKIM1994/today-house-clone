const Joi = require("joi");
const { makeError } = require("../error");

const JoiHelper = {
  //Users
  signUpCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(new makeError("email 형식에 맞춰서 입력 바랍니다.")),

      nickname: Joi.string()
        .required()
        .regex(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,15}$/)
        .error(
          new makeError("닉네임은 특수문자 제외 2~15자만 입력이 가능합니다.")
        ),

      password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{8,}$/)
        .error(
          new makeError("비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다.")
        ),

      confirm: Joi.string()
        .required()
        .Joi.ref("password")
        .error(new makeError("비밀번호 확인이 일치하지 않습니다.")),
    });

    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },

  loginCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      email: Joi.String()
        .required()
        .email()
        .error(new makeError("email 형식에 맞춰서 입력 바랍니다.")),

      password: Joi.String()
        .required()
        .regex(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,15}$/)
        .error("비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다."),
    });

    try {
      await check.validateAsync(req.body);
    } catch (error) {
      next(error);
    }
    next();
  },

  //Goods

  gooodsCheck: async (req, res, next) => {
    const check = Joi.object.key({
      goodsId: Joi.number()
        .required()
        .error(new makeError("게시물을 조회할 수 없습니다.")),
    });
    try {
      await check.validateAsync(req.params);
    } catch (error) {
      next(error);
    }
    next();
  },

  //Comment

  commentCheck: async (req, res, next) => {
    const check = Joi.object.key({
      commentId: Joi.number()
        .required()
        .error(new makeError("댓글을 조회할 수 없습니다.")),
    });
    try {
      await check.validateAsync(req.params);
    } catch (error) {
      next(error);
    }
    next();
  },
};

module.exports = JoiHelper;
