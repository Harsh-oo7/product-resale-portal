export const GenerateAccessCode = () => {
  //   const code = Math.floor(10000 + Math.random() * 900000);
  const code = 123456;
  let expiry = new Date();
  expiry.setTime(new Date().getTime() + 30 * 60 * 1000);

  return { code, expiry };
};

export const SendVerificationCode = async (
  code: number,
  toPhoneNumber: string
) => {
  console.log("code: ", code);
  console.log("Mobile: ", toPhoneNumber);
};
