export const verifyRoles = (...allowedRoles: any) => {
  return (req: any, res: any, next: any) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];

    const result = req.roles
      .map((role: any) => rolesArray.includes(role))
      .find((val: any) => val === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};
