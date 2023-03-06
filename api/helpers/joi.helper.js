const Joi = require("joi");
const { makeError } = require("../error");

const JoiHelper = {
  //Users
  signUpCheck: async (req, res, next) => {
    const check = Joi.object().keys({
      email: Joi.string()
        .email()
        .required()
        .error(
          new makeError({
            message: "email 형식에 맞춰서 입력 바랍니다.",
            code: 400,
          })
        ),

      nickname: Joi.string()
        .required()
        .regex(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,15}$/)
        .error(
          new makeError({
            message: "닉네임은 특수문자 제외 2~15자만 입력이 가능합니다.",
            code: 400,
          })
        ),

      password: Joi.string()
        .required()
        .regex(/^[a-zA-Z0-9]{8,}$/)
        .error(
          new makeError({
            message: "비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다.",
            code: 400,
          })
        ),

      confirm: Joi.ref("password"),
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
      email: Joi.string()
        .required()
        .email()
        .error(
          new makeError({
            message: "email 형식에 맞춰서 입력 바랍니다.",
            code: 400,
          })
        ),

      password: Joi.string()
        .required()
        .regex(/^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]){2,15}$/)
        .error({
          message: "비밀번호는 영문, 숫자를 포함한 8자리 이상 조합입니다.",
          code: 400,
        }),
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
        .error(
          new makeError({ message: "게시물을 조회할 수 없습니다.", code: 400 })
        ),
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
        .error(
          new makeError({ message: "댓글을 조회할 수 없습니다.", code: 400 })
        ),
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
