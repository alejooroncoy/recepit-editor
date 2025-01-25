export const POST = ({ cookies }) => {
  cookies.delete("token");

  return new Response(null, {
    status: 200,
  });
};
