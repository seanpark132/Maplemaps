type Options = {
  reqType: string;
  dataQuery?: any;
  dataQueryKey?: string;
};

export const fetchMongoDbConstructor = async (options: Options) => {
  const response = await fetch(
    "https://v66rewn65j.execute-api.us-west-2.amazonaws.com/prod/fetch-mongodb",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reqType: options.reqType,
        [options.dataQueryKey ? options.dataQueryKey : ""]: options.dataQuery
          ? options.dataQuery
          : "",
      }),
    },
  );
  const data = await response.json();
  return data;
};
