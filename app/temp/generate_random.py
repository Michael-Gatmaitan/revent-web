import numpy as np

def generate_lstm_training_data(sequence_length=20, num_sequences=1000, num_unique_values=10):
  """Generates an array of random integer sequences for LSTM training.

  Args:
    sequence_length: The length of each individual sequence.
    num_sequences: The number of sequences to generate.
    num_unique_values: The number of unique integer values in the sequences.

  Returns:
    A NumPy array of shape (num_sequences, sequence_length) containing the integer sequences.
  """
  data = np.random.randint(0, num_unique_values, size=(num_sequences, sequence_length))
  return data

# Generate an array of 1000 sequences, each with a length of 20,
# using integers from 0 to 9.
training_data = generate_lstm_training_data()

# Print the shape of the generated data and the first few sequences.
print("Shape of the training data:", training_data.shape)
print("\nFirst 5 training sequences:")
print(training_data[:5])

# print(generate_lstm_training_data())
# [4,5,6,5,6,9,7,8,7,3,5,5,0,8,4,5,4,9,0,5,0,9,6,9,7,4,1,9,9,1,2,8,6,5,3,6,6,3,1,1]
# [4,5,6,5,6,9,7,8,7,3,5,5,0,8,4,5,4,9,0,5,0,9,6,9,7,4,1,9,9,1,2,8,6,5,3,6,6,3,1,1]
