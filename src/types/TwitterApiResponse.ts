type TwitterApiResponse = {
  data?:
    | {
        id: string;
        text: string;
      }
    | undefined;
  errors?:
    | {
        detail?: string | undefined;
        status?: number | undefined;
        title: string;
        type: string;
      }[]
    | undefined;
};

export default TwitterApiResponse;
