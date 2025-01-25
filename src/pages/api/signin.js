import jwt from "jsonwebtoken";

export const POST = async ({ request, cookies }) => {
  const data = await request.json();

  if (data.password === import.meta.env.PASSWORD) {
    const token = jwt.sign(
      {
        random: crypto.randomUUID(),
      },
      import.meta.env.PRIVATE_KEY
    );

    cookies.set("token", token, {
      path: "/",
    });

    return new Response(
      JSON.stringify({
        token,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  return new Response(
    JSON.stringify({
      error: "La contraseña es incorrecta",
    }),
    {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
