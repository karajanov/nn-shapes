class NeuralNetwork {

    constructor(input_nodes, hidden_nodes, output_nodes) {

        this.input_nodes = input_nodes;
        this.hidden_nodes = hidden_nodes;
        this.output_nodes = output_nodes;

        //connection weights between the input and hidden layer
        this.weights_ih = new Matrix(hidden_nodes, input_nodes).randomize();

        //connection weights between the hidden and output layer
        this.weights_ho = new Matrix(output_nodes, hidden_nodes).randomize();

        //a bias in case the input values are 0
        //determines the difficulty of outputting a specific result
        this.bias_h = new Matrix(hidden_nodes, 1).randomize();
        this.bias_o = new Matrix(output_nodes, 1).randomize();

        this.learning_rate = 0.1;
    }

    //the initial inputs are combined with the weights (input -> hidden)
    //and the bias to produce a hidden layer output
    getHiddenOutputs(inputArr) {

        let inputValues = Matrix.toMatrix(inputArr);

        if (inputValues.rows !== this.input_nodes) {
            console.error('Feedforward implementation error: the length of the input array must be = to the number of input nodes');
            return undefined;
        }

        let tempHidden = Matrix.mult(this.weights_ih, inputValues);
        let hiddenOutputs = Matrix.add(tempHidden, this.bias_h);
        hiddenOutputs.applyToAllElements(NeuralNetwork.sigmoid);

        return hiddenOutputs;
    }

    //the output from the hidden layer is combined with the weights (hidden -> output)
    //and the bias to produce a final/overall result
    getOverallOutputs(hiddenOutputs) {

        let tempOutput = Matrix.mult(this.weights_ho, hiddenOutputs);
        let overallOutputs = Matrix.add(tempOutput, this.bias_o);
        overallOutputs.applyToAllElements(NeuralNetwork.sigmoid);

        return overallOutputs;
    }

    //the overall outputs are individually subtracted
    //from some desired values (values that we want the network to produce)
    //in order to calculate the error rate
    getOverallErrorRates(overallOutputs, desiredOutputsArr) {

        let answers = Matrix.toMatrix(desiredOutputsArr);
        let guesses = overallOutputs;

        if (answers.rows !== guesses.rows) {
            console.error('The overall outputs must be = to the desired outputs');
            return undefined;
        }

        let outputErrors = Matrix.subtract(answers, guesses);

        return outputErrors;
    }

    //the overall error rate needs to be distributed across
    //the hidden layer in order for the weights to be updated accordingly
    getHiddenErrorRates(outputErrors) {

        let transposedWeightsHo = Matrix.transpose(this.weights_ho);
        let hiddenErrors = Matrix.mult(transposedWeightsHo, outputErrors);

        return hiddenErrors;
    }

    //calculating the deltas of the weights (the value that the weights
    //need to be tweaked by and produce an output closer to the desired one)
    updateWeightsHiddenOutput(overallOutputs, outputErrors, hiddenOutputs) {

        overallOutputs
            .applyToAllElements(NeuralNetwork.dsigmoid)
            .multElementWise(outputErrors)
            .mult(this.learning_rate);

        let tranposedHiddenOutputs = Matrix.transpose(hiddenOutputs);
        let deltaWeightsHo = Matrix.mult(overallOutputs, tranposedHiddenOutputs);

        this.weights_ho = Matrix.add(this.weights_ho, deltaWeightsHo);
        this.bias_o = Matrix.add(this.bias_o, overallOutputs);

        return this;
    }

    //tweaking the weights between the input and hidden layer
    updateWeightsInputHidden(hiddenOutputs, hiddenErrors, inputArr) {

        let inputs = Matrix.toMatrix(inputArr);

        hiddenOutputs
            .applyToAllElements(NeuralNetwork.dsigmoid)
            .multElementWise(hiddenErrors)
            .mult(this.learning_rate);

        let transposedInputs = Matrix.transpose(inputs);
        let deltaWeightsIh = Matrix.mult(hiddenOutputs, transposedInputs);

        this.weights_ih = Matrix.add(this.weights_ih, deltaWeightsIh);
        this.bias_h = Matrix.add(this.bias_h, hiddenOutputs);
    }

    feedforward(inputArr, desiredArr) {

        let hiddenOutputs = this.getHiddenOutputs(inputArr);
        let overallOutputs = this.getOverallOutputs(hiddenOutputs);

        let overallErrors = this.getOverallErrorRates(overallOutputs, desiredArr);
        let hiddenErrors = this.getHiddenErrorRates(overallErrors);

        this
            .updateWeightsHiddenOutput(overallOutputs, overallErrors, hiddenOutputs)
            .updateWeightsInputHidden(hiddenOutputs, hiddenErrors, inputArr);
    }

    getStructuredOutput(inputArr) {

        let hiddenOutputs = this.getHiddenOutputs(inputArr);
        let overallOutputs = this.getOverallOutputs(hiddenOutputs);

        return overallOutputs.toArray();
    }

    train(iterations, trainingData) {
        for (let i = 0; i < iterations; ++i) {
            for (let j = 0; j < trainingData.length; ++j) {
                let desiredArr = null;
                switch (trainingData[j].label) {
                    case 'triangle':
                        desiredArr = [1, 0, 0];
                        break;
                    case 'square':
                        desiredArr = [0, 1, 0];
                        break;
                    case 'circle':
                        desiredArr = [0, 0, 1];
                        break;
                }
                let normalizedInput = NeuralNetwork.normalize(trainingData[j], 255);
                this.feedforward(normalizedInput, desiredArr);
            }
        }
    }

    getTestResults(testingData) {
        let counter = 0;
        for (let i = 0; i < testingData.length; ++i) {
            let testInput = testingData[i];
            let normalizedInput = NeuralNetwork.normalize(testInput, 255);
            let resultArr = this.getStructuredOutput(normalizedInput);
            let maxArg = getArgMax(resultArr);
            if (testInput.label === listOfShapes[maxArg].toLowerCase()) {
                counter++;
            }
        }
        return counter;
    }

    //the hidden and overall outputs are input into the sigmoid function
    //that maps their values in a range from 0 to 1
    static sigmoid(x) {

        //Math.exp(-x) => e^(-x)
        return 1 / (1 + Math.exp(-x));

    }

    //the derivative of sigmoid
    //this function is performed on inputs that have already been
    //transformed by the sigmoid function
    static dsigmoid(y) {

        return y * (1 - y);

    }

    static normalize(inputArr, n) {

        return inputArr.map(v => v / n);
    }

}