/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.craigdearden.games;


import java.io.File;
import java.net.URL;
import java.util.Optional;
import java.util.ResourceBundle;
import javafx.application.Platform;
import javafx.collections.ObservableList;
import javafx.event.ActionEvent;
import javafx.fxml.FXML;
import javafx.fxml.Initializable;
import javafx.scene.Node;
import javafx.scene.control.Alert;
import javafx.scene.control.ButtonType;
import javafx.scene.image.Image;
import javafx.scene.image.ImageView;
import javafx.scene.input.MouseEvent;
import javafx.scene.layout.AnchorPane;
import javafx.scene.layout.GridPane;

/**
 *
 * @author C1
 */
public class ConnectFourController implements Initializable
{

    private enum Circle
    {
        Red, Black, None
    };
    private Circle _whoseTurn = Circle.None;
    private Circle _winner = Circle.None;
    private Circle[][] _gameBoard = new Circle[6][7];
    private final int bottomRow = 5;
    private Image _blank;
    private Image _redCircle;
    private Image _blackCircle;

    @FXML
    private AnchorPane ap;
    @FXML
    private GridPane gp;
    @FXML
    private ImageView image00;
    @FXML
    private ImageView image10;
    @FXML
    private ImageView image20;
    @FXML
    private ImageView image30;
    @FXML
    private ImageView image40;
    @FXML
    private ImageView image50;
    @FXML
    private ImageView image60;

    @FXML
    private ImageView image01;
    @FXML
    private ImageView image11;
    @FXML
    private ImageView image21;
    @FXML
    private ImageView image31;
    @FXML
    private ImageView image41;
    @FXML
    private ImageView image51;
    @FXML
    private ImageView image61;

    @FXML
    private ImageView image02;
    @FXML
    private ImageView image12;

    @FXML
    private ImageView image22;
    @FXML
    private ImageView image32;
    @FXML
    private ImageView image42;
    @FXML
    private ImageView image52;
    @FXML
    private ImageView image62;

    @FXML
    private ImageView image03;
    @FXML
    private ImageView image13;
    @FXML
    private ImageView image23;
    @FXML
    private ImageView image33;
    @FXML
    private ImageView image43;
    @FXML
    private ImageView image53;
    @FXML
    private ImageView image63;

    @FXML
    private ImageView image04;
    @FXML
    private ImageView image14;
    @FXML
    private ImageView image24;
    @FXML
    private ImageView image34;
    @FXML
    private ImageView image44;
    @FXML
    private ImageView image54;
    @FXML
    private ImageView image64;

    @FXML
    private ImageView image05;
    @FXML
    private ImageView image15;
    @FXML
    private ImageView image25;
    @FXML
    private ImageView image35;
    @FXML
    private ImageView image45;
    @FXML
    private ImageView image55;
    @FXML
    private ImageView image65;

    @FXML
    public void column_CLICK(MouseEvent click)
    {
        Node source = (Node) click.getSource();
        int colIndex = GridPane.getColumnIndex(source);

        int rowIndex = bottomRow;
        while (rowIndex >= 0 && _gameBoard[rowIndex][colIndex] != Circle.None)
        {
            rowIndex--;
        }

        if (rowIndex >= 0)
        {

            ImageView iv = getImageView(rowIndex, colIndex, gp);
            if (_whoseTurn == Circle.Red)
            {
                iv.setImage(_redCircle);
                _gameBoard[rowIndex][colIndex] = Circle.Red;
            } else if (_whoseTurn == Circle.Black)
            {
                iv.setImage(_blackCircle);
                _gameBoard[rowIndex][colIndex] = Circle.Black;
            }

            isWinner();
            if (_winner == Circle.Red)
            {
                alert("Winner", "Red Wins!");
                gp.setDisable(true);
            } else if (_winner == Circle.Black)
            {
                alert("Winner", "Black Wins!");
                gp.setDisable(true);
            }

            nextTurn();
        } else
        {
            alert("Hey!", "That column is full. Choose a different column.");
        }

    }
    
    @FXML
    public void menuFileNew_CLICK(ActionEvent click)
    {
        Optional<ButtonType> result = prompt("New Game", "Are you sure you want to start an new game?");
        if (result.get() == ButtonType.OK)
        {
            initializeGame();
            gp.setDisable(false);
        }
    }
    
    @FXML
    public void menuFileExit_CLICK(ActionEvent click)
    {
        Optional<ButtonType> result = prompt("Exit", "Are you sure you want to exit?");
        
        if(result.get() == ButtonType.OK)
        {
            Platform.exit();
        }
    }
    
    @FXML
    public void menuHelpAbout_CLICK(ActionEvent click)
    {
        alert("About", "Product Version: Connect Four 1.0 \n");
    }
    
    

    private ImageView getImageView(int row, int column, GridPane gridPane)
    {
        ImageView iv = null;
        ObservableList<Node> children = gridPane.getChildren();
        for (Node child : children)
        {
            if (child instanceof ImageView && gridPane.getColumnIndex(child) ==
                    column &&
                    gridPane.getRowIndex(
                            child) == row)
            {
                iv = (ImageView) child;
            }
        }

        return iv;
    }

    private void alert(String title, String message)
    {
        Alert alert = new Alert(Alert.AlertType.WARNING);
        alert.setGraphic(null);
        alert.setHeaderText(null);
        alert.setTitle(title);
        alert.setContentText(message);
        alert.showAndWait();
    }
    
    private Optional<ButtonType> prompt(String title, String message)
    {
        Alert alert = new Alert(Alert.AlertType.CONFIRMATION);
        alert.setGraphic(null);
        alert.setHeaderText(null);
        alert.setTitle(title);
        alert.setContentText(message);
        alert.getButtonTypes().setAll(ButtonType.OK, ButtonType.CANCEL);
        return alert.showAndWait();
    }

    private void nextTurn()
    {
        if (_whoseTurn == Circle.Black)
        {
            _whoseTurn = Circle.Red;
        } else
        {
            _whoseTurn = Circle.Black;
        }
    }

    private void isWinner()
    {

        for (int rowOrigin = 0; rowOrigin <= 2; rowOrigin++)
        {
            for (int columnOrigin = 0; columnOrigin <= 3; columnOrigin++)
            {
                isWinner_check4x4(rowOrigin, columnOrigin);
            }
        }
    }

    private void isWinner_check4x4(int rowOrigin, int columnOrigin)
    {
        int numRed;
        int numBlack;

        //Check rows
        for (int row = rowOrigin; row <= rowOrigin + 3; row++)
        {
            numRed = 0;
            numBlack = 0;
            for (int column = columnOrigin; column <= columnOrigin + 3; column++)
            {
                if (_gameBoard[row][column] == Circle.Black)
                {
                    numBlack++;
                } else if (_gameBoard[row][column] == Circle.Red)
                {
                    numRed++;
                }
            }
            if (numRed == 4)
            {
                _winner = Circle.Red;
            } else if (numBlack == 4)
            {
                _winner = Circle.Black;
            }
            
        }

        //Check columns
        for (int column = columnOrigin; column <= columnOrigin + 3; column++)
        {
            numRed = 0;
            numBlack = 0;
            for (int row = rowOrigin; row <= rowOrigin + 3; row++)
            {
                if (_gameBoard[row][column] == Circle.Black)
                {
                    numBlack++;
                } else if (_gameBoard[row][column] == Circle.Red)
                {
                    numRed++;
                }
            }
            if (numRed == 4)
            {
                _winner = Circle.Red;
            } else if (numBlack == 4)
            {
                _winner = Circle.Black;
            }
        }

        //Check diagnol
        numRed = 0;
        numBlack = 0;
        int column = columnOrigin;
        for (int row = rowOrigin; row <= rowOrigin + 3; row++)
        {
            if (_gameBoard[row][column] == Circle.Black)
            {
                numBlack++;
            } else if (_gameBoard[row][column] == Circle.Red)
            {
                numRed++;
            }
            column++;
        }
        if (numRed == 4)
        {
            _winner = Circle.Red;
        } else if (numBlack == 4)
        {
            _winner = Circle.Black;
        }

        //Check anti-diagnoal
        numRed = 0;
        numBlack = 0;
        column = columnOrigin;
        for (int row = rowOrigin + 3; row >= rowOrigin; row--)
        {
            if (_gameBoard[row][column] == Circle.Black)
            {
                numBlack++;
            } else if (_gameBoard[row][column] == Circle.Red)
            {
                numRed++;
            }
            column++;
        }
        if (numRed == 4)
        {
            _winner = Circle.Red;
        } else if (numBlack == 4)
        {
            _winner = Circle.Black;
        }
    }

    
    
    @FXML
    @Override
    public void initialize(URL url, ResourceBundle rb)
    {
        initializeGame();
    }
    
    
    private void initializeGame()
    {
        _blank = new Image(new File("./Images/blank.png").toURI().toString());
        _blackCircle = new Image(
                new File("./Images/black.png").toURI().toString());
        _redCircle = new Image(new File("./Images/red.png").toURI().toString());

        image00.setImage(_blank);
        image10.setImage(_blank);
        image20.setImage(_blank);
        image30.setImage(_blank);
        image40.setImage(_blank);
        image50.setImage(_blank);
        image60.setImage(_blank);

        image01.setImage(_blank);
        image11.setImage(_blank);
        image21.setImage(_blank);
        image31.setImage(_blank);
        image41.setImage(_blank);
        image51.setImage(_blank);
        image61.setImage(_blank);

        image02.setImage(_blank);
        image12.setImage(_blank);
        image22.setImage(_blank);
        image32.setImage(_blank);
        image42.setImage(_blank);
        image52.setImage(_blank);
        image62.setImage(_blank);

        image03.setImage(_blank);
        image13.setImage(_blank);
        image23.setImage(_blank);
        image33.setImage(_blank);
        image43.setImage(_blank);
        image53.setImage(_blank);
        image63.setImage(_blank);

        image04.setImage(_blank);
        image14.setImage(_blank);
        image24.setImage(_blank);
        image34.setImage(_blank);
        image44.setImage(_blank);
        image54.setImage(_blank);
        image64.setImage(_blank);

        image05.setImage(_blank);
        image15.setImage(_blank);
        image25.setImage(_blank);
        image35.setImage(_blank);
        image45.setImage(_blank);
        image55.setImage(_blank);
        image65.setImage(_blank);

        for (int row = 0; row <= 5; row++)
        {
            for (int column = 0; column <= 6; column++)
            {
                _gameBoard[row][column] = Circle.None;
            }
        }

        _whoseTurn = Circle.Red;
        _winner = Circle.None;
    }
}
