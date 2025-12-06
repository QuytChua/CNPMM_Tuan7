// GraphQL helper function
export const graphqlRequest = async (query, variables = {}) => {
  try {
    console.log("GraphQL Request:", { query: query.trim(), variables });

    const response = await fetch("/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("GraphQL Response:", data);

    if (data.errors) {
      console.error("GraphQL Errors:", data.errors);
      throw new Error(data.errors.map((e) => e.message).join(", "));
    }

    return data.data;
  } catch (error) {
    console.error("GraphQL Error:", error);
    if (error.message.includes("Failed to fetch")) {
      throw new Error(
        "Không thể kết nối đến server. Vui lòng kiểm tra server có đang chạy không."
      );
    }
    throw error;
  }
};
