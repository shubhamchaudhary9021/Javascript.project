class Solution:
    def isPalindrome(self, x: int) -> bool:
        if x < 0:
          return False
        n = x
        rev = 0
        while x> 0:
          digit = x%10
          rev = rev*10 + digit
          x = x//10
        if n == rev:
            return True
        else:
            return False

        