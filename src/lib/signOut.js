export const signOut = async () => {
  await fetch("/api/signout", {
    method: "POST",
  });
};
