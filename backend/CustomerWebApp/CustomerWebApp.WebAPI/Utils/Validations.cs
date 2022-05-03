namespace CustomerWebApp.WebAPI.Utils
{
    public class Validations
    {
        public bool ValidateCpf(string cpf)
        {
            return CheckTwoLastDigits(cpf);
        }

        private bool CheckTwoLastDigits(string cpf)
        {
            //Calculating the first digit
            string firstNineDigits = cpf.Substring(0, 9);
            int firstSum = GetSum(10, firstNineDigits);
            int firstCalculatedDigit = GetDigit(firstSum, 11);

            //Calculating the second digit
            string firstTenDigits = cpf.Substring(0, 9) 
                + firstCalculatedDigit.ToString();
            int secondSum = GetSum(11, firstTenDigits);
            int secondCalculatedDigit = GetDigit(secondSum, 11);

            //Comparing the calculated digits with the two last digits of the given cpf
            string calculatedDigits = firstCalculatedDigit.ToString() +
                secondCalculatedDigit.ToString();
            string twoLastDigits = cpf.Substring(9, 2);

            if (calculatedDigits == twoLastDigits) return true;

            return false;
        }

        private int GetSum(int multpl,string numbers)
        {
            int j = multpl;
            int sum = 0;
            for (int i = 0; i < numbers.Length; i++)
            {
                sum = sum + (Convert.ToInt32(numbers.Substring(i,1)) * j);
                j = j - 1;
            }
            return sum;
        }

        private int GetDigit(int dividend, int divider)
        {
            int rest = dividend % divider;
            if (rest < 2) return 0;
            else return 11 - rest;
        }
    }
}
