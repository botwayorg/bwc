export const verifyRoles = (...allowedRoles: any[]) => {
  return (
    req: { roles: any[] },
    res: { sendStatus: (arg0: number) => any },
    next: () => void
  ) => {
    if (!req?.roles) return res.sendStatus(401);

    const rolesArray = [...allowedRoles];
    const result = req.roles
      .map((role: any) => rolesArray.includes(role))
      .find((val: boolean) => val === true);

    if (!result) return res.sendStatus(401);

    next();
  };
};
