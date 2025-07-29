export const formatAED = (value: string | number | null | undefined): string => {
    const number = typeof value === 'string' ? parseInt(value) : value;

    if (!isNaN(number as number)) {
      const withCommas = (number as number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return `${withCommas}`;
    }
    else if (number === null || value === null) {
      return "N/A";
    }
  };