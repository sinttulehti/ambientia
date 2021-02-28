import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bank-ocr',
  templateUrl: './bank-ocr.component.html',
  styleUrls: ['./bank-ocr.component.scss'],
})
export class BankOcrComponent implements OnInit {
  form: FormGroup;
  accountNumbersPrint: String = '';
  constructor(private builder: FormBuilder) {}

  ngOnInit(): void {
    // initial value
    this.form = this.builder.group({
      ocrInput: [
        '    _  _     _  _  _  _  _ \n' +
          '  | _| _||_||_ |_   ||_||_|\n' +
          '  ||_  _|  | _||_|  ||_| _|\n' +
          '                           \n' +
          ' _  _     _  _        _  _ \n' +
          '|_ |_ |_| _|  |  ||_||_||_ \n' +
          '|_||_|  | _|  |  |  | _| _|\n' +
          '                           \n' +
          '    _  _  _  _  _  _     _ \n' +
          '|_||_   ||_ | ||_|| || || |\n' +
          '  | _|  | _||_||_||_||_||_|\n' +
          '                            ',
      ],
    });
  }

  /**
   * Make sure the input itself is correct
   * It must be divisable by 28 which is line length
   *
   * @param input String User submitted input
   */
  private validateInput(input: string) {
    if (!input) {
      return false;
    }
    if ((input.length / 28) % 1 !== 0) {
      return false;
    }

    return true;
  }

  /**
   * Validate that every fourth row is empty as per requirements
   *
   * @param input Array User submitted text as array
   */
  private validateEmptyRows(input: Array<String>) {
    let everyFourthRow = input.filter(
      (value: String, index: number) => index % 4 === 3
    );
    // There needs to be an empty row after all account numbers
    if (input.length % everyFourthRow.length !== 0) {
      return false;
    }
    // we must also check that these rows are completely empty
    for (let emptyRow of everyFourthRow) {
      if (emptyRow.trim()) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validate checksums of accounts and construct string output
   *
   * @param accountNumberMatrixes Array All account numbers collected
   */
  private validateCheckSums(accountNumberMatrixes: Array<any>) {
    // unique values for numbers 0-9
    // sum is calculated based on positions of characters on a 9x9 grid
    const ciphers = [100, 15, 129, 135, 57, 131, 134, 35, 140, 137];

    // Decipher and validate account numbers
    for (let accountNumber of accountNumberMatrixes) {
      let accountNumberString = '';
      let checkSumMultiplier = 10;
      let accountNumberCheckSum = 0;
      let checkSumError = '';
      for (let cipher of accountNumber) {
        let decipheredNumber = ciphers.indexOf(cipher);
        if (decipheredNumber < 0) {
          accountNumberString += '?';
          checkSumError = 'ILL';
          continue;
        }
        accountNumberString += decipheredNumber;
        accountNumberCheckSum += --checkSumMultiplier * decipheredNumber;
      }
      if (accountNumberCheckSum % 11 !== 0) {
        checkSumError = 'ERR';
      }
      this.accountNumbersPrint +=
        accountNumberString + ' ' + checkSumError + '<br>';
    }
  }

  /**
   * Run user given input through validation and checksum calculation
   */
  public test() {
    this.accountNumbersPrint = '';
    // Format input, replace line breaks with spaces,
    // we get a long string of pipes and underscores
    let input = this.form.value.ocrInput.replace(/(\r\n|\n|\r)/gm, ' ');
    let inputValid = this.validateInput(input);
    if (!inputValid) {
      alert('Input is not valid!');
      return;
    }
    // Input data is OK, check empty rows
    let inputAsArray = input.match(/.{1,28}/g);
    let emptyRowsValid = this.validateEmptyRows(inputAsArray);
    if (!emptyRowsValid) {
      alert('Error in requirement: Every fourth row must be empty!');
    }
    // Empty row data is OK, split it into arrays consisting data of single numbers
    let accountNumberMatrixes = []; // length is undefined, holds all account numbers
    accountNumberMatrixes.push(new Array(9).fill(0)); // add first row
    let accountNumberIndex = 0;
    let rowMultiplier = 1;
    for (let [index, inputRow] of inputAsArray.entries()) {
      // every fourth row is skipped, add new row while we have numbers to process
      if (index % 4 === 3 && index < inputAsArray.length - 1) {
        accountNumberMatrixes.push(new Array(9).fill(0));
        accountNumberIndex++;
        rowMultiplier = 1;
        continue;
      }
      // single number indexes
      let numberIndex = 0;
      let loopIndex = 0;
      let placeMultiplier = 1;
      for (let char of inputRow) {
        if (loopIndex < inputRow.length - 1 && loopIndex % 3 === 0) {
          numberIndex++;
          placeMultiplier = 1;
        }
        let sum = 0;
        switch (char) {
          case '_':
            sum = rowMultiplier * placeMultiplier * 10;
            break;
          case '|':
            sum = rowMultiplier * placeMultiplier;
            break;
          case ' ':
            sum = sum;
            break;
          default:
            alert('Unsupported character detected, aborting!');
            return;
        }
        accountNumberMatrixes[accountNumberIndex][numberIndex - 1] += sum;
        loopIndex++;
        placeMultiplier++;
      }
      rowMultiplier++;
    }

    // Finally, construct account data to string and validate checksums
    this.validateCheckSums(accountNumberMatrixes);
  }
}
