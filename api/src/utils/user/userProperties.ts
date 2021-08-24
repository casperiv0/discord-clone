export function userProperties() {
  return {
    avatar: true,
    bio: true,
    createdAt: true,
    email: true,
    id: true,
    name: true,
    status: true,
    statusMessage: true,
    tag: true,
    username: true,
    connections: {
      select: {
        id: true,
        type: true,
        url: true,
        name: true,
      },
    },
  };
}
