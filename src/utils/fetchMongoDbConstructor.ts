type Options = {
  reqType: string;
  region?: string;
  mapId?: number;
};

export const fetchMongoDbConstructor = async (options: Options) => {
  const response = await fetch(
    "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Encoding": "br, gzip",
      },
      body: JSON.stringify({
        reqType: options.reqType,
        region: options.region,
        mapId: options.mapId,
      }),
    },
  );

  if (response.status !== 200) {
    throw new Error("Failed to fetch data.");
  }

  const data = await response.json();

  return data;
};
